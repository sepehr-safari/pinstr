import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from 'nostr-tools';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { usePublish } from '@/logic/mutations';

export const useMutateNoteComment = (note: Event<1> | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  const publishCommentFn = useCallback(
    (text: string) => {
      if (!note) throw new Error('Note is undefined');

      return publish({
        content: text,
        kind: 1,
        tags: [['e', note.id], ['p', note.pubkey], ...note.tags],
      });
    },
    [note, publish]
  );

  return useMutation({
    mutationFn: (text: string) =>
      toast.promise(() => publishCommentFn(text), {
        pending: 'Publishing your comment...',
        error: 'An error has been occured! Please try again.',
        success: 'Successfully published!',
      }),
    onSuccess: (comment) => {
      queryClient.setQueryData(['nostr', 'notes', comment.id], comment);
      queryClient.invalidateQueries(['nostr', 'notes', note?.id, 'reactions']);
    },
  });
};
