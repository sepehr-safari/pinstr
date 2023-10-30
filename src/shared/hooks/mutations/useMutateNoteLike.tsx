import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { usePublish } from '@/shared/hooks/mutations';

export const useMutateNoteLike = (note: NDKEvent | undefined | null) => {
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
    onError: () => {
      toast('An error has been occured! Please try again.', { type: 'error' });
    },
  });
};
