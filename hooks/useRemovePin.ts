import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import useBoards from './useBoards';

const useRemovePin = (board: string | undefined) => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate, boards } = useBoards();
  const pins = board ? boards.get(board) : undefined;

  const removePin = useCallback(
    (pin: string) => {
      if (!board || !pins || !pin) {
        return;
      }

      pins.delete(pin);

      const dTag = ['d', board];
      const headersTag = ['headers', 'Name'];
      const pinTags: string[][] = [];

      pins?.forEach((pin, name) => {
        const pinTag: string[] = ['pin', name];
        pin.forEach((value, key) => {
          headersTag.push(key);
          pinTag.push(value);
        });
        pinTags.push(pinTag);
      });

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [dTag, headersTag, ...pinTags],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [invalidate, publish, board, pins]
  );

  return {
    removePin,
  };
};

export default useRemovePin;
