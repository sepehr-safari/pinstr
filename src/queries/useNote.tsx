import { useQuery } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/store';

export const useNote = (noteId: string | undefined) => {
  const pool = useLocalStore((store) => store.pool);
  const relays = useLocalStore((store) => store.relays);

  const fetchNote = useCallback(async () => {
    if (!pool || !relays || !noteId)
      throw new Error('Missing dependencies in fetching note');

    const filter: Filter = { kinds: [1], limit: 1, ids: [noteId] };

    try {
      const events = await pool.batchedList('notes', relays, [filter]);

      if (events.length == 0) throw new Error('Note not found');

      return events[0];
    } catch (error) {
      throw new Error('Error in fetching note');
    }
  }, [pool, relays, noteId]);

  return useQuery({
    queryKey: ['nostr', 'notes', noteId],
    queryFn: fetchNote,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: typeof noteId != 'undefined' && !!pool && !!relays,
  });
};
