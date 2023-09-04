import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from 'nostr-tools';

import { usePublish } from '@/logic/mutations';

export const useMutateNoteLike = (note: Event<1> | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!note) throw new Error('Note is undefined');

      return publish({
        content: '+',
        kind: 7,
        tags: [
          ['e', note.id],
          ['p', note.pubkey],
        ],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['nostr', 'notes', note?.id, 'reactions']);
    },
  });
};
