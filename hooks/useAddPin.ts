import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import useBoards from './useBoards';
import useCurrentBoard from './useCurrentBoard';

const useAddPin = () => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate } = useBoards();

  const { currentBoard, currentTags } = useCurrentBoard();

  const addPin = useCallback(
    (name: string, values: string[]) => {
      if (
        !name ||
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
          ...currentTags.pinTags,
          ['pin', name, ...values],
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
