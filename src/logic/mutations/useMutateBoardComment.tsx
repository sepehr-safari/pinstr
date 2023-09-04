import { useMutation, useQueryClient } from '@tanstack/react-query';

import { usePublish } from '@/logic/mutations';
import { Board } from '@/logic/types';

export const useMutateBoardComment = (board: Board | undefined | null) => {
  const publish = usePublish();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => {
      if (!board) throw new Error('Board is undefined');

      return publish({
        content: text,
        kind: 1,
        tags: [
          ['a', `${33889}:${board.author}:${board.title}`],
          ['p', board.author],
        ],
      });
    },
    onSuccess: (event) => {
      queryClient.setQueryData(['nostr', 'notes', event.id], event);
      queryClient.invalidateQueries(['nostr', 'boards', board?.author, board?.title, 'reactions']);
    },
  });
};
