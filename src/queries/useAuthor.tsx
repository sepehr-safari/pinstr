import { useQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/store';
import { parseAuthorsFromEvents } from '@/utils';

export const useAuthor = (hexPubkey: string | undefined) => {
  const pool = useLocalStore((store) => store.pool);
  const relays = useLocalStore((store) => store.relays);

  const fetchAuthor = useCallback(async () => {
    if (!pool || !relays || !hexPubkey)
      throw new Error('Missing dependencies in fetching author');

    const filter: Filter = { kinds: [0], limit: 1, authors: [hexPubkey] };

    try {
      const events = await pool.batchedList('authors', relays, [filter]);
      const parsedAuthors = parseAuthorsFromEvents(events);

      if (parsedAuthors.length == 0) return null;

      return parsedAuthors[0];
    } catch (error) {
      throw new Error('Error in fetching author');
    }
  }, [pool, relays, hexPubkey]);

  return useQuery({
    queryKey: ['nostr', 'authors', hexPubkey],
    queryFn: fetchAuthor,
    refetchOnWindowFocus: false,
    enabled: typeof hexPubkey != 'undefined' && !!pool && !!relays,
  });
};
