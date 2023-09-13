import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Filter, nip19 } from 'nostr-tools';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useFiltersParams } from '@/logic/hooks';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';
import { parseBoardsFromEvents } from '@/logic/utils';

export const useBoards = () => {
  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { category, format, tag } = useFiltersParams();
  const c = category.value;
  const f = format.value;
  const t = tag.value;

  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchBoards = useCallback(
    async ({ pageParam = undefined }: { pageParam?: number | undefined }) => {
      if (!pool || !relays) throw new Error('Missing dependencies in fetching boards');

      const filter: Filter = { kinds: [33889 as number], limit: 10, until: pageParam };
      if (!!author) filter['authors'] = [author];
      if (!!title) filter['#d'] = [title];
      if (!!c) filter['#c'] = [c];
      if (!!f) filter['#f'] = [f];
      if (!!t) filter['#t'] = [t];

      try {
        const events = await pool.list(relays, [filter]);
        const parsedBoards = parseBoardsFromEvents(events);

        if (parsedBoards.length == 0) throw new Error('No boards found');

        return parsedBoards;
      } catch (error) {
        throw new Error('Error in fetching boards');
      }
    },
    [pool, relays, author, title, c, f, t]
  );

  return useInfiniteQuery({
    queryKey: ['nostr', 'boards', { author, title, category: c, format: f, tag: t }],
    queryFn: fetchBoards,
    placeholderData: () => {
      const query = queryClient.getQueryData<{ pages: Board[][]; pageParams: number | undefined }>(
        ['nostr', 'boards'],
        { exact: false }
      );

      const boards = query?.pages?.flat() || [];

      const matchingBoards = boards.filter((board) => {
        let matchAuthor = true;
        let matchTitle = true;
        let matchCategory = true;
        let matchFormat = true;
        let matchTag = true;

        if (!!author && board.author != author) matchAuthor = false;
        if (!!title && board.title != title) matchTitle = false;
        if (!!c && board.category != c) matchCategory = false;
        if (!!f && board.format != f) matchFormat = false;
        if (!!t && !board.tags.includes(t)) matchTag = false;

        return matchAuthor && matchTitle && matchCategory && matchFormat && matchTag;
      });

      return {
        pages: [matchingBoards],
        pageParams: [undefined],
      };
    },
    staleTime: 1000, // 1 second
    enabled: !!pool && !!relays,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 10) return undefined;

      return lastPage[lastPage.length - 1].timestamp - 1;
    },
  });
};
