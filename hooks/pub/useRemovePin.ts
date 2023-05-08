import { useRouter } from 'next/navigation';
import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useRemovePin = () => {
  const router = useRouter();

  const publish = usePublish(['wss://nos.lol']);

  const removePin = useCallback(
    (pin: Pin, board: Board, invalidate: () => void) => {
      if (!pin.length || board.headers.length === 0) {
        return;
      }

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', board.name],
          ['headers', ...board.headers],
          ...board.pins
            .filter((p) => p[0] !== pin[0])
            .map((p) => ['pin', ...p]),
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
        router.push(`/my/${board.name}`);
      });
    },
    [publish]
  );

  return {
    removePin,
  };
};

export default useRemovePin;
