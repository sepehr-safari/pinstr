import { useInfiniteQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { parseBoardsFromEvents } from '@/logic/utils';

export const useBoardsByAuthor = ({ author }: { author: string | undefined }) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

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
    staleTime: 4000, // 4 seconds
    enabled: !!pool && !!relays && !!author,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 10) return undefined;

      return lastPage[lastPage.length - 1].timestamp - 1;
    },
  });
};
