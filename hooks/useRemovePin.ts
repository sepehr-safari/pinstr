import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import { useCurrentBoard, useBoards } from '@/hooks';

const useRemovePin = () => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate } = useBoards();

  const { currentBoard, currentTags } = useCurrentBoard();

  const removePin = useCallback(
    (pin: string) => {
      if (
        !pin ||
        !currentBoard.name ||
        !currentTags.d ||
        !currentTags.headers
      ) {
        return;
      }

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          currentTags.d,
          currentTags.headers,
          ...currentTags.pins.filter((pinTag) => pinTag[1] !== pin),
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [invalidate, publish, currentBoard, currentTags]
  );

  return {
    removePin,
  };
};

export default useRemovePin;
