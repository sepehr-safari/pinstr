import { usePublish } from 'nostr-hooks';
import { Event } from 'nostr-tools';
import { useCallback } from 'react';

const useStar = () => {
  const publish = usePublish(['wss://nos.lol']);

  const starBoard = useCallback(
    (board: Board, invalidate: () => void) => {
      publish({
        content: '+',
        kind: 7,
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

  const starNote = useCallback(
    (note: Event, invalidate: () => void) => {
      publish({
        content: '+',
        kind: 7,
        tags: [
          ['e', note.id],
          ['p', note.pubkey],
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    starBoard,
    starNote,
  };
};

export default useStar;
