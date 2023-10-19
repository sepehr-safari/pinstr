import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { usePublish } from '@/logic/mutations';
import { useLocalStore } from '@/logic/store';
import { Format, NDKBoard } from '@/logic/types';
import { normalizePinContent } from '@/logic/utils';

export const useMutateBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');
  const pinIndex = searchParams.get('i');

  const { category, description, headers, image, pins, tags, title, format, id, author } =
    useLocalStore((store) => store.board);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const publish = usePublish();

  const publishBoardFn = useCallback(
    async (overridePins?: string[][] | undefined) => {
      if (!format || !category || !title || !description || !image || !headers) {
        throw new Error('Missing required fields');
      }

      const newPins = [...(overridePins || pins || [])];
      if (pinIndex != null && newPins.length > +pinIndex && action != 'remove-pin') {
        for (let hIndex = 0; hIndex < headers.length; hIndex++) {
          if (newPins[+pinIndex][hIndex] !== '') {
            const normalizedContent = await normalizePinContent({
              content: newPins[+pinIndex][hIndex],
              format: headers[hIndex].split(':')[0] as Format,
            });

            newPins[+pinIndex][hIndex] = normalizedContent;
          }
        }
      }

      return publish({
        kind: 33889 as number,
        tags: [
          ['d', title],
          ['description', description],
          ['c', category],
          ['f', format],
          ['image', image],
          ['headers', ...headers],
          ...(tags || [])
            .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
            .map((t) => ['t', t]),
          ...newPins.filter((p) => p.some((c) => c !== '')).map((p) => ['pin', ...p]),
        ],
      });
    },
    [publish, title, description, image, category, format, tags, pins, headers, pinIndex]
  );

  const deleteBoardFn = useCallback(() => {
    if (!id) {
      throw new Error('Missing initial board');
    }

    return publish({ kind: 5, tags: [['e', id]] });
  }, [id, publish]);

  const updateBoardFn = useCallback(async () => {
    // TODO: NDKBoard is not the actual type of the board in react-query cache
    const cachedBoard = queryClient.getQueryData<NDKBoard>(['nostr', 'boards', { author, title }], {
      exact: false,
    });

    if (!cachedBoard) {
      await deleteBoardFn();
    }

    return publishBoardFn();
  }, [publishBoardFn, deleteBoardFn, queryClient, author, title]);

  return {
    publishBoard: useMutation({
      mutationFn: () =>
        toast.promise(publishBoardFn, {
          pending: 'Publishing...',
          error: 'An error has been occured! Please try again.',
          success: 'Successfully published!',
        }),
      onSuccess: (event) => {
        queryClient.invalidateQueries({
          queryKey: ['nostr', 'boards', { author: event.pubkey, title }],
        });

        navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title, { replace: true });
      },
      onError: () => {
        setSearchParams(
          (searchParams) => {
            searchParams.delete('action');
            searchParams.delete('i');
            return searchParams;
          },
          { replace: true }
        );
      },
    }),
    updateBoard: useMutation({
      mutationFn: () =>
        toast.promise(updateBoardFn, {
          pending: 'Publishing...',
          error: 'An error has been occured! Please try again.',
          success: 'Successfully Published!',
        }),
      onSuccess: (event) => {
        queryClient.invalidateQueries({
          queryKey: ['nostr', 'boards', { author: event.pubkey, title }],
        });

        navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title, { replace: true });
      },
      onError: () => {
        setSearchParams(
          (searchParams) => {
            searchParams.delete('action');
            return searchParams;
          },
          { replace: true }
        );
      },
    }),
    deleteBoard: useMutation({
      mutationFn: () =>
        toast.promise(deleteBoardFn, {
          pending: 'Deleting board...',
          error: 'An error has been occured! Please try again.',
          success: 'Successfully deleted!',
        }),
      onSuccess: (event) => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards', { author: event.pubkey }] });

        navigate('/p/' + nip19.npubEncode(event.pubkey), {
          replace: true,
        });
      },
      onError: () => {
        setSearchParams(
          (searchParams) => {
            searchParams.delete('action');
            searchParams.delete('confirm');
            return searchParams;
          },
          { replace: true }
        );
      },
    }),
    removePin: useMutation({
      mutationFn: () => {
        const newPins = [...(pins || [])];

        if (pinIndex != null && newPins.length > 0) {
          newPins.splice(parseInt(pinIndex), 1);

          return toast.promise(publishBoardFn(newPins), {
            pending: 'Removing pin...',
            error: 'An error has been occured! Please try again.',
            success: 'Successfully removed!',
          });
        } else {
          throw new Error('Unexpected remove action');
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards', { author, title }] });

        navigate('/p/' + nip19.npubEncode(author!.pubkey) + '/' + title, { replace: true });
      },
      onError: () => {
        toast('An error has been occured! Please try again.', { type: 'error' });

        setSearchParams(
          (searchParams) => {
            searchParams.delete('action');
            searchParams.delete('i');
            searchParams.delete('confirm');
            return searchParams;
          },
          { replace: true }
        );
      },
    }),
  };
};
