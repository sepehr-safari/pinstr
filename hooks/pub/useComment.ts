import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useComment = () => {
  const publish = usePublish(['wss://nos.lol']);

  const commentOnBoard = useCallback(
    (comment: string, board: Board, invalidate: () => void) => {
      publish({
        content: comment,
        kind: 1,
        tags: [
          ['a', `${33888}:${board.pubkey}:${board.name}`],
          ['p', board.pubkey],
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    commentOnBoard,
  };
};

export default useComment;
