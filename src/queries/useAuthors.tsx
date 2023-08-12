import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Event, Filter, SimplePool } from 'nostr-tools';

import { parseAuthorsFromEvents } from '@/utils';

export default function useAuthors(options?: {
  authors?: string[];
  enabled?: boolean;
}) {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['nostr', 'authors', { authors: options?.authors }],
    queryFn: async () => {
      const pool = queryClient.getQueryData(['app', 'pool']) as SimplePool;
      if (!pool) return;

      const relays = queryClient.getQueryData(['app', 'relays']) as string[];
      if (!relays) return;

      const filter = { kinds: [0], limit: 10 } as Filter;
      if (options && !!options.authors && options.authors.length > 0) {
        filter.authors = options.authors;
      }

      const events = (await pool.list(relays, [filter])) as Event<0>[];

      return parseAuthorsFromEvents(events);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: options?.enabled,
  });

  return { isAuthorsLoading: isLoading, authorsError: error, authors: data };
}
