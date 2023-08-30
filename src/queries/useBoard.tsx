import { useQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/store';
import { parseBoardsFromEvents } from '@/utils';

export const useBoard = ({ author, title }: { author: string; title: string }) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const fetchBoard = useCallback(async () => {
    if (!pool || !relays) throw new Error('Missing dependencies in fetching boards');

    const filter: Filter = {
      kinds: [33889 as number],
      limit: 1,
      authors: [author],
      '#d': [title],
    };

    try {
      const events = await pool.list(relays, [filter]);
      const parsedBoards = parseBoardsFromEvents(events);

      if (parsedBoards.length == 0) throw new Error('Board not found');

      return parsedBoards[0];
    } catch (error) {
      throw new Error('Error in fetching boards');
    }
  }, [pool, relays, author, title]);

  return useQuery({
    queryKey: ['nostr', 'boards', author, title],
    queryFn: fetchBoard,
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays,
  });
};
