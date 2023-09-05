import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { parseBoardsFromEvents } from '@/logic/utils';

export const useSearch = (text: string | undefined) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchSearch = useCallback(async () => {
    if (!pool || !relays || !text) throw new Error('Missing dependencies in search');

    const filter: Filter = {
      kinds: [33889 as number],
      limit: 10,
      search: text,
    };

    try {
      const events = await pool.list(['wss://relay.pinstr.app'], [filter]);
      const parsedBoards = parseBoardsFromEvents(events);

      parsedBoards.forEach((board) =>
        queryClient.setQueryData(['nostr', 'boards', board.author, board.title], board)
      );

      return parsedBoards;
    } catch (error) {
      throw new Error('Error in fetching search');
    }
  }, [pool, relays, text]);

  return useQuery({
    queryKey: ['nostr', 'search', text],
    queryFn: fetchSearch,
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays && !!text,
  });
};
