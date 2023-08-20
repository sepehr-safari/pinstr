import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Event, Filter } from 'nostr-tools';

import { useAuthors } from '@/queries';
import { useLocalStore } from '@/store';
import { parseBoardsFromEvents } from '@/utils';

export const useBoards = ({
  authors = null,
  title = null,
  enabled = true,
}: {
  authors?: string[] | null;
  title?: string | null;
  enabled?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { pool, relays } = useLocalStore();

  const {
    isLoading,
    error,
    data: boards,
  } = useQuery({
    queryKey: ['nostr', 'boards', { authors, title }],
    queryFn: async () => {
      const filter = { kinds: [33889 as number], limit: 10 } as Filter;
      if (authors && authors.length > 0) {
        filter.authors = authors;
      }
      if (!!title) {
        filter['#d'] = [title];
      }

      const events = (await pool.list(relays, [filter])) as Event<number>[];

      return parseBoardsFromEvents(events);
    },
    refetchOnWindowFocus: false,
    enabled: !!pool && !!relays && enabled,
  });

  const {
    authors: authorsDetails,
    authorsError,
    isAuthorsLoading,
  } = useAuthors({
    authors: boards?.map((board) => board.author.pubkey),
    enabled: !!boards && boards.length > 0,
  });

  if (
    !!authorsDetails &&
    authorsDetails.length > 0 &&
    !!boards &&
    boards.length > 0
  ) {
    queryClient.setQueryData(
      ['nostr', 'boards', { authors, title }],
      boards.map((board) => ({
        ...board,
        author: {
          ...board.author,
          details:
            authorsDetails.find(
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
};
