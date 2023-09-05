import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { parseBoardsFromEvents } from '../utils';

export const useTag = (tag: string | undefined) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchTag = useCallback(async () => {
    if (!pool || !relays || !tag) throw new Error('Missing dependencies in search');

    const filter: Filter = {
      kinds: [33889 as number],
      limit: 10,
      '#t': [tag],
    };

    try {
      const events = await pool.list(['wss://relay.nostr.band'], [filter]);
      const parsedBoards = parseBoardsFromEvents(events);

      parsedBoards.forEach((board) =>
        queryClient.setQueryData(['nostr', 'boards', board.author, board.title], board)
      );

      return parsedBoards;
    } catch (error) {
      throw new Error('Error in fetching search');
    }
  }, [pool, relays, tag]);

  return useQuery({
    queryKey: ['nostr', 'tags', tag],
    queryFn: fetchTag,
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays && !!tag,
  });
};
