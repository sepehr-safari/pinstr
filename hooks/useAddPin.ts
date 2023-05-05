import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import useBoards from './useBoards';

const useAddPin = (board: string | undefined) => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate, boards } = useBoards();
  const pins = board ? boards.get(board) : undefined;

  const addPin = useCallback(
    (newPin: Pin) => {
      const name = newPin.get('Name');
      if (!board || !pins || !name) {
        return;
      }

      pins.set(name, newPin);

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
    addPin,
  };
};

export default useAddPin;
