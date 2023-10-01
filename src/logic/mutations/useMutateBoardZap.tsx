import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useAuthor, useUser } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';
import {
  getZapEndpoint,
  makeZapRequest,
  signEventWithNip07,
  signEventWithSeckey,
} from '@/logic/utils';

export const useMutateBoardZap = ({
  board,
  amount,
  comment,
}: {
  board: Board | undefined | null;
  amount: number;
  comment: string;
}) => {
  const queryClient = useQueryClient();

  const { seckey } = useUser();

  const relays = useLocalStore((state) => state.relays);

  const { data: author } = useAuthor(board?.author);

  const zapBoardFn = useCallback(async () => {
    if (!board) {
      throw new Error('Board is not defined');
    }

    if (author) {
      try {
        const zapRequest = makeZapRequest({
          profile: board.author,
          amount: amount * 1000,
          comment: comment,
          a: `${board.event.kind}:${board.author}:${board.title}`,
          relays,
          e: null,
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
  }, [board, amount, comment, author, relays]);

  return useMutation({
    mutationFn: () =>
      toast.promise(zapBoardFn, {
        pending: 'Zapping...',
        success: 'Successfully Zapped!',
        error: 'Failed to zap board',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['nostr', 'boards', { author: board?.author, title: board?.title }, 'reactions'],
        exact: false,
      });
    },
  });
};
