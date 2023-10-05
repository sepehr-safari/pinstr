import { useInfiniteQuery } from '@tanstack/react-query';
import { Filter, nip19 } from 'nostr-tools';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useFiltersParams } from '@/logic/hooks';
import { useSettings } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { filterBoardsByMuteList, parseBoardsFromEvents } from '@/logic/utils';

export const useBoards = () => {
  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: settings } = useSettings();

  const { category, format, tag } = useFiltersParams();
  const c = category.value;
  const f = format.value;
  const t = tag.value;

  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const fetchBoards = useCallback(
    async ({ pageParam = undefined }: { pageParam?: number | undefined }) => {
      if (!pool || !relays) throw new Error('Missing dependencies in fetching boards');

      const filter: Filter = { kinds: [33889 as number], limit: 50, until: pageParam };
      if (!!author) filter['authors'] = [author];
      if (!!title) filter['#d'] = [title];
      if (!!c) filter['#c'] = [c];
      if (!!f) filter['#f'] = [f];
      if (!!t) filter['#t'] = [t];

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
    [pool, relays, author, title, c, f, t, settings]
  );

  return useInfiniteQuery({
    queryKey: [
      'nostr',
      'boards',
      { author, title, category: c, format: f, tag: t, muteList: settings?.muteList.join(',') },
    ],
    queryFn: fetchBoards,
    retry: 4,
    staleTime: 0,
    enabled: !!pool && !!relays,
    getNextPageParam: (lastPage) =>
      lastPage.length > 0 ? lastPage[lastPage.length - 1].timestamp - 1 : undefined,
  });
};
