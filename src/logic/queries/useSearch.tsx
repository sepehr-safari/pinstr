import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useSettings } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { filterBoardsByMuteList, parseBoardsFromEvents } from '@/logic/utils';

export const useSearch = (text: string | undefined) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const { data: settings } = useSettings();

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
      const filteredBoards =
        settings && settings.muteList
          ? filterBoardsByMuteList(parsedBoards, settings.muteList)
          : parsedBoards;

      filteredBoards.forEach((board) =>
        queryClient.setQueryData(
          ['nostr', 'boards', { author: board.author, title: board.title }],
          [board]
        )
      );

      return filteredBoards;
    } catch (error) {
      throw new Error('Error in fetching search');
    }
  }, [pool, relays, text, settings]);

  return useQuery({
    queryKey: ['nostr', 'search', { text, muteList: settings?.muteList }],
    queryFn: fetchSearch,
    retry: 1,
    staleTime: 4000, // 4 seconds
    enabled: !!pool && !!relays && !!text,
  });
};
