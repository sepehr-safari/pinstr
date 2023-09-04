import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from 'nostr-tools';

import { usePublish } from '@/logic/mutations';

export const useMutateNoteComment = (note: Event<1> | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => {
      if (!note) throw new Error('Note is undefined');

      return publish({
        content: text,
        kind: 1,
        tags: [['e', note.id], ['p', note.pubkey], ...note.tags],
      });
    },
    onSuccess: (comment) => {
      queryClient.setQueryData(['nostr', 'notes', comment.id], comment);
      queryClient.invalidateQueries(['nostr', 'notes', note?.id, 'reactions']);
    },
  });
};
