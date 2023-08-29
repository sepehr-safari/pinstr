import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/store';
import { Board } from '@/types';
import { parseBoardsFromEvents } from '@/utils';

export const useBoardsExplorer = () => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchBoards = useCallback(async () => {
    if (!pool || !relays)
      throw new Error('Missing dependencies in fetching boards');

    const filter: Filter = { kinds: [33889 as number], limit: 10 };

    try {
      const events = await pool.list(relays, [filter]);
      const parsedBoards = parseBoardsFromEvents(events);

      if (parsedBoards.length == 0) throw new Error('No boards found');

      parsedBoards.forEach((board) =>
        queryClient.setQueryData(
          ['nostr', 'boards', board.author, board.title],
          board
        )
      );

      return parsedBoards;
    } catch (error) {
      throw new Error('Error in fetching boards');
    }
  }, [pool, relays]);

  return useQuery({
    queryKey: ['nostr', 'boards'],
    queryFn: fetchBoards,
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays,
  });
};
