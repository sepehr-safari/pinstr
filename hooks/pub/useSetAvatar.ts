import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useSetAvatar = () => {
  const publish = usePublish(['wss://nos.lol']);

  const setAvatar = useCallback(
    (avatar: string, board: Board, invalidate: () => void) => {
      if (board.headers.length === 0) {
        return;
      }

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', board.name],
          ['avatar', avatar || ''],
          ['headers', ...board.headers],
          ...board.pins.map((p) => ['pin', ...p]),
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    setAvatar,
  };
};

export default useSetAvatar;
