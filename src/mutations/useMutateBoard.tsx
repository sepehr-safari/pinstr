import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { boardTypes } from '@/components';
import { usePublish } from '@/mutations';
import { useLocalStore } from '@/store';
import { Board } from '@/types';
import { normalizePinContent } from '@/utils';

export const useMutateBoard = () => {
  const [searchParams, _] = useSearchParams();
  const action = searchParams.get('action');
  const pinIndex = searchParams.get('i');

  const { category, description, headers, image, pins, tags, title, type, id, author } =
    useLocalStore((store) => store.board);
  const setBoard = useLocalStore((store) => store.setBoard);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const publish = usePublish();

  const publishBoardFn = useCallback(
    async (overridePins?: string[][] | undefined) => {
      if (!type || !category || !title || !description || !image) {
        throw new Error('Missing required fields');
      }

      const newPins = [...(overridePins || pins || [])];
      if (pinIndex != null && newPins.length > +pinIndex && action != 'remove-pin') {
        const normalizedContent = await normalizePinContent({
          content: newPins[+pinIndex]?.[0],
          boardType: type,
        });
        newPins[+pinIndex][0] = normalizedContent;
      }

      return publish({
        kind: 33889 as number,
        tags: [
          ['d', title],
          ['description', description],
          ['category', category],
          ['type', type],
          ['image', image],
          headers && headers.length > 0
            ? ['headers', ...headers]
            : ['headers', ...boardTypes[type].headers],
          ...(tags || [])
            .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
            .map((t) => ['t', t]),
          ...newPins.map((p) => ['pin', ...p]),
        ],
      });
    },
    [publish, title, description, image, category, type, tags, pins, headers, pinIndex]
  );

  const deleteBoardFn = useCallback(() => {
    if (!id) {
      throw new Error('Missing initial board');
    }

    return publish({ kind: 5, tags: [['e', id]] });
  }, [id, publish]);

  const updateBoardFn = useCallback(async () => {
    const cachedBoard = queryClient.getQueryData<Board>(['nostr', 'boards', author, title]);

    if (!cachedBoard) {
      await deleteBoardFn();
    }

    return publishBoardFn();
  }, [publishBoardFn, deleteBoardFn, queryClient, author, title]);

  return {
    publishBoard: useMutation({
      mutationFn: () => publishBoardFn(),
      onSuccess: (event) => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setBoard({});
        navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title, {
          replace: true,
        });
      },
      onError: () => {
        setBoard({});
        navigate('/', { replace: true });
      },
    }),
    updateBoard: useMutation({
      mutationFn: updateBoardFn,
      onSuccess: (event) => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setBoard({});
        navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title, {
          replace: true,
        });
      },
      onError: () => {
        setBoard({});
        navigate('/', { replace: true });
      },
    }),
    deleteBoard: useMutation({
      mutationFn: deleteBoardFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setBoard({});
        navigate('/p/' + nip19.npubEncode(author!), {
          replace: true,
        });
      },
      onError: () => {
        setBoard({});
        navigate('/', { replace: true });
      },
    }),
    removePin: useMutation({
      mutationFn: () => {
        const newPins = [...(pins || [])];

        if (pinIndex != null && newPins.length > 0) {
          newPins.splice(parseInt(pinIndex), 1);

          return publishBoardFn(newPins);
        } else {
          throw new Error('Unexpected remove action');
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['nostr', 'boards', author, title],
        });

        setBoard({});
        navigate('/p/' + nip19.npubEncode(author!) + '/' + title, {
          replace: true,
        });
      },
      onError: () => {
        setBoard({});
        navigate('/', { replace: true });
      },
    }),
  };
};
