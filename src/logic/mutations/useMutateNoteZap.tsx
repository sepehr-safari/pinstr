import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Event } from 'nostr-tools';

import { useAuthor, useUser } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import {
  getZapEndpoint,
  makeZapRequest,
  signEventWithNip07,
  signEventWithSeckey,
} from '@/logic/utils';

export const useMutateNoteZap = ({
  note,
  amount,
  comment,
}: {
  note: Event<1> | undefined | null;
  amount: number;
  comment: string;
}) => {
  const queryClient = useQueryClient();

  const { seckey } = useUser();

  const relays = useLocalStore((state) => state.relays);

  const { data: author } = useAuthor(note?.pubkey);

  const zapNoteFn = useCallback(async () => {
    if (!note) {
      throw new Error('Board is not defined');
    }

    if (author) {
      try {
        const zapRequest = makeZapRequest({
          profile: note.pubkey,
          amount: amount * 1000,
          comment: comment,
          e: note.id,
          relays,
          a: null,
        });

        const zapEndpoint = await getZapEndpoint(author);

        if (!zapEndpoint) {
          throw new Error('Zap endpoint is not defined');
        }

        const signedEvent = seckey
          ? signEventWithSeckey(zapRequest, seckey)
          : await signEventWithNip07(zapRequest);

        const zapResponse = await fetch(
          `${zapEndpoint}?amount=${amount * 1000}&nostr=${encodeURIComponent(
            JSON.stringify(signedEvent)
          )}`
        );

        const zapResult = await zapResponse.json();

        if (!zapResult) {
          throw new Error('Zap result is not defined');
        }

        console.log(zapResult);

        const { pr: invoice } = zapResult;

        const { webln } = window as { webln?: any };

        if (webln) {
          try {
            await webln.enable();

            try {
              await webln.sendPayment(invoice);

              return true;
            } catch (error) {
              throw new Error('Failed to send payment');
            }
          } catch (e) {
            throw new Error('Failed to enable WebLN');
          }
        } else {
          throw new Error('WebLN is not defined');
        }
      } catch (error) {
        throw new Error('Failed to zap board');
      }
    } else {
      throw new Error('Author is not defined');
    }
  }, [note, amount, comment, author, relays]);

  return useMutation({
    mutationFn: () =>
      toast.promise(zapNoteFn, {
        pending: 'Zapping...',
        success: 'Successfully Zapped!',
        error: 'Failed to zap board',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['nostr', 'notes', note?.id, 'reactions']);
    },
  });
};
