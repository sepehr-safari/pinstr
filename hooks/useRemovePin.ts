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
        !currentTags.dTag ||
        !currentTags.headersTag
      ) {
        return;
      }

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          currentTags.dTag,
          currentTags.headersTag,
          ...currentTags.pinTags.filter((pinTag) => pinTag[1] !== pin),
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
