import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Event, Filter } from 'nostr-tools';

import { parseBoardsFromEvents } from '@/utils';

import { useAuthors } from '@/queries';

import useLocalState from '@/store';

export default function useBoards(variables?: {
  authors?: string[];
  title?: string;
}) {
  const queryClient = useQueryClient();
  const { pool, relays } = useLocalState((state) => state);

  const {
    isLoading,
    error,
    data: boards,
  } = useQuery({
    queryKey: ['nostr', 'boards', variables],
    queryFn: async () => {
      const filter = { kinds: [33889 as number], limit: 10 } as Filter;
      if (variables && !!variables.authors && variables.authors.length > 0) {
        filter.authors = variables.authors;
      }
      if (variables && !!variables.title) {
        filter['#d'] = [variables.title];
      }

      const events = (await pool.list(relays, [filter])) as Event<number>[];

      return parseBoardsFromEvents(events);
    },
    refetchOnWindowFocus: false,
    enabled: !!pool && !!relays,
  });

  const { authors, authorsError, isAuthorsLoading } = useAuthors({
    authors: boards?.map((board) => board.author.pubkey),
    enabled: !!boards && boards.length > 0,
  });

  if (!!authors && authors.length > 0 && !!boards && boards.length > 0) {
    queryClient.setQueryData(
      ['nostr', 'boards', variables],
      boards.map((board) => ({
        ...board,
        author: {
          ...board.author,
          details:
            authors.find(
              (author) => author.hexPubkey === board.author.pubkey
            ) || undefined,
        },
      }))
    );
  }

  return {
    loadingState: { boards: isLoading, authors: isAuthorsLoading },
    error: { boards: error, authors: authorsError },
    data: { boards },
  };
}
