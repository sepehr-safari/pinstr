import { useInfiniteQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useSettings } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { filterBoardsByMuteList, parseBoardsFromEvents } from '@/logic/utils';

export const useBoardsByAuthor = ({ author }: { author: string | undefined }) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const { data: settings } = useSettings();

  const fetchBoard = useCallback(
    async ({ pageParam = undefined }: { pageParam?: number | undefined }) => {
      if (!pool || !relays || !author) throw new Error('Missing dependencies in fetching boards');

      const filter: Filter = {
        kinds: [33889 as number],
        limit: 20,
        authors: [author],
        until: pageParam,
      };

      try {
        const events = await pool.list(relays, [filter]);
        const parsedBoards = parseBoardsFromEvents(events);
        const filteredBoards =
          settings && settings.muteList
            ? filterBoardsByMuteList(parsedBoards, settings.muteList)
            : parsedBoards;

        return filteredBoards;
      } catch (error) {
        throw new Error('Error in fetching boards');
      }
    },
    [pool, relays, author, settings]
  );

  return useInfiniteQuery({
    queryKey: ['nostr', 'boards', { author, muteList: settings?.muteList.join(',') }],
    queryFn: fetchBoard,
    retry: 2,
    staleTime: 4000, // 4 seconds
    enabled: !!pool && !!relays && !!author,
    getNextPageParam: (lastPage) =>
      lastPage.length > 0 ? lastPage[lastPage.length - 1].timestamp - 1 : undefined,
  });
};
