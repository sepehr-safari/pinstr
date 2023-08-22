import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/store';
import { Board } from '@/types';
import { parseBoardsFromEvents } from '@/utils';

export const useBoards = ({
  author = undefined,
  title = undefined,
  enabled,
}: {
  author?: string | undefined;
  title?: string | undefined;
  enabled: boolean;
}) => {
  const pool = useLocalStore((state) => state.pool);
  const relays = useLocalStore((state) => state.relays);

  const queryClient = useQueryClient();

  const fetchBoards = useCallback(async () => {
    if (enabled && (!pool || !relays))
      throw new Error('Missing dependencies in fetching boards');

    const filter: Filter = { kinds: [33889 as number], limit: 10 };
    if (author) filter.authors = [author];
    if (title) filter['#d'] = [title];

    try {
      const events = await pool.list(relays, [filter]);
      const parsedBoards = parseBoardsFromEvents(events);

      if (parsedBoards.length == 0) return null;

      return parsedBoards;
    } catch (error) {
      throw new Error('Error in fetching boards');
    }
  }, [pool, relays, author, title]);

  return useQuery({
    queryKey: ['nostr', 'boards', author || 'all', title || 'all'],
    queryFn: fetchBoards,
    placeholderData: () => {
      const allBoards = queryClient.getQueryData<Board[]>(['nostr', 'boards'], {
        exact: false,
      });
      if (allBoards) {
        return allBoards.filter((board) => {
          if (author && title) {
            return board.author == author && board.title == title;
          } else if (author) {
            return board.author == author;
          } else if (title) {
            return board.title == title;
          } else {
            return true;
          }
        });
      } else {
        return undefined;
      }
    },
    refetchOnWindowFocus: false,
    enabled: enabled && !!pool && !!relays,
  });
};
