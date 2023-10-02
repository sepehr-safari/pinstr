import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useLocalStore } from '@/logic/store';
import { Reactions } from '@/logic/types';
import { parseReactionsFromEvents } from '@/logic/utils';

export const useNoteReactions = (noteId: string | undefined) => {
  const pool = useLocalStore((store) => store.pool);
  const relays = useLocalStore((store) => store.relays);

  const queryClient = useQueryClient();

  const fetchReactions = useCallback(async () => {
    if (!pool || !relays || !noteId)
      throw new Error('Missing dependencies in fetching note reactions');

    const filter: Filter = {
      '#e': [noteId],
      kinds: [1, 7, 9735],
    };

    try {
      const events = await pool.batchedList('noteReactions', relays, [filter]);

      if (events.length == 0) return { likes: [], comments: [], zaps: [] } as Reactions;

      const parsedReactions = parseReactionsFromEvents(events);

      if (parsedReactions.comments.length > 0) {
        parsedReactions.comments.forEach((event) =>
          queryClient.setQueryData(['nostr', 'notes', event.id], event)
        );
      }

      return parsedReactions;
    } catch (error) {
      throw new Error('Error in fetching note reactions');
    }
  }, [pool, relays, noteId, queryClient]);

  return useQuery({
    queryKey: ['nostr', 'notes', noteId, 'reactions'],
    queryFn: fetchReactions,
    retry: 4,
    staleTime: 4000, // 4 seconds
    enabled: !!noteId && !!pool && !!relays,
  });
};
