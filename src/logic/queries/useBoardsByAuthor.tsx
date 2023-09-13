import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';
import { parseBoardsFromEvents } from '@/logic/utils';

export const useBoardsByAuthor = ({ author }: { author: string | undefined }) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchBoard = useCallback(
    async ({ pageParam = undefined }: { pageParam?: number | undefined }) => {
      if (!pool || !relays || !author) throw new Error('Missing dependencies in fetching boards');

      const filter: Filter = {
        kinds: [33889 as number],
        limit: 10,
        authors: [author],
        until: pageParam,
      };

      try {
        const events = await pool.list(relays, [filter]);
        const parsedBoards = parseBoardsFromEvents(events);

        if (parsedBoards.length == 0) throw new Error('No boards found');

        return parsedBoards;
      } catch (error) {
        throw new Error('Error in fetching boards');
      }
    },
    [pool, relays, author]
  );

  return useInfiniteQuery({
    queryKey: ['nostr', 'boards', { author }],
    queryFn: fetchBoard,
    placeholderData: () => {
      const query = queryClient.getQueryData<{ pages: Board[][]; pageParams: number | undefined }>(
        ['nostr', 'boards'],
        { exact: false }
      );

      const boards = query?.pages?.flat() || [];

      const matchingBoards = boards.filter((board) => board.author == author);

      return {
        pages: [matchingBoards],
        pageParams: [undefined],
      };
    },
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays && !!author,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 10) return undefined;

      return lastPage[lastPage.length - 1].timestamp - 1;
    },
  });
};
