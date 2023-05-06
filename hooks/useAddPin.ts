import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import { useBoards, useCurrentBoard } from '@/hooks';

const useAddPin = () => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate } = useBoards();

  const { currentBoard, currentTags } = useCurrentBoard();

  const addPin = useCallback(
    (name: string, items: string[]) => {
      if (
        !name ||
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
          ...currentTags.pins,
          ['pin', name, ...items],
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [invalidate, publish, currentBoard, currentTags]
  );

  return {
    addPin,
  };
};

export default useAddPin;
