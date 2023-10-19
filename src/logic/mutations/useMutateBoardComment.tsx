import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { usePublish } from '@/logic/mutations';
import { NDKBoard } from '@/logic/types';

export const useMutateBoardComment = (board: NDKBoard | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  const publishCommentFn = useCallback(
    (text: string) => {
      if (!board) {
        throw new Error('Board is undefined');
      }

      return publish({
        content: text,
        kind: 1,
        tags: [
          ['a', `${33889}:${board.author.pubkey}:${board.title}`],
          ['p', board.author.pubkey],
        ],
      });
    },
    [board, publish]
  );

  return useMutation({
    mutationFn: (text: string) =>
      toast.promise(() => publishCommentFn(text), {
        pending: 'Publishing your comment...',
        error: 'An error has been occured! Please try again.',
        success: 'Successfully published!',
      }),
    onSuccess: (event) => {
      queryClient.setQueryData(['nostr', 'notes', event.id], event);
      queryClient.invalidateQueries([
        'nostr',
        'boards',
        { author: board?.author.pubkey, title: board?.title },
        'reactions',
      ]);
    },
  });
};
