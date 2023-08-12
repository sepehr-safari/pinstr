import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Event, Filter, SimplePool } from 'nostr-tools';

import { parseBoardsFromEvents } from '@/utils';

import { useAuthors } from '@/queries';

export default function useBoards(variables?: {
  authors?: string[];
  boardName?: string;
}) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: boards,
  } = useQuery({
    queryKey: ['nostr', 'boards', variables],
    queryFn: async () => {
      const pool = queryClient.getQueryData(['app', 'pool']) as SimplePool;
      if (!pool) return;

      const relays = queryClient.getQueryData(['app', 'relays']) as string[];
      if (!relays) return;

      const kinds = queryClient.getQueryData(['app', 'kinds']) as number[];
      if (!kinds) return;

      const filter = { kinds, limit: 10 } as Filter;
      if (variables && !!variables.authors && variables.authors.length > 0) {
        filter.authors = variables.authors;
      }
      if (variables && !!variables.boardName) {
        filter['#d'] = [variables.boardName];
      }

      const events = (await pool.list(relays, [filter])) as Event<number>[];

      return parseBoardsFromEvents(events);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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
