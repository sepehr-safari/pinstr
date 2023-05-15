import { usePublish } from 'nostr-hooks';
import { Event } from 'nostr-tools';
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

  const commentOnNote = useCallback(
    (comment: string, note: Event, invalidate: () => void) => {
      publish({
        content: comment,
        kind: 1,
        tags: [['e', note.id], ['p', note.pubkey], ...note.tags],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    commentOnBoard,
    commentOnNote,
  };
};

export default useComment;
