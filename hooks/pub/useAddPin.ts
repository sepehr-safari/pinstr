import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useAddPin = () => {
  const publish = usePublish(['wss://nos.lol']);

  const addPin = useCallback(
    (pin: Pin, board: Board, invalidate: () => void) => {
      if (!pin.length || board.headers.length === 0) {
        return;
      }

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', board.name],
          ['avatar', board.avatar],
          ['headers', ...board.headers],
          ...board.pins
            .filter((p) => p[0] !== pin[0])
            .map((p) => ['pin', ...p]),
          ['pin', ...pin],
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    addPin,
  };
};

export default useAddPin;
