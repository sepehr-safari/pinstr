import { useMutation, useQueryClient } from '@tanstack/react-query';

import { usePublish } from '@/mutations';
import { Board } from '@/types';

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
      queryClient.invalidateQueries(['nostr', 'boards', board?.author, board?.title, 'reactions']);
    },
  });
};
