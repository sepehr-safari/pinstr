import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { usePublish } from '@/logic/mutations';
import { Board } from '@/logic/types';

export const useMutateBoardLike = (board: Board | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (!board) throw new Error('Board is undefined');

      return publish({
        content: '+',
        kind: 7,
        tags: [
          ['a', `${33889}:${board?.author}:${board?.title}`],
          ['p', board?.author],
        ],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        'nostr',
        'boards',
        { author: board?.author, title: board?.title },
        'reactions',
      ]);
    },
    onError: () => {
      toast('An error has been occured! Please try again.', { type: 'error' });
    },
  });
};
