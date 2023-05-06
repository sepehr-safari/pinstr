import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import { useBoards, useCurrentBoard } from '@/hooks';

const useInsertHeader = () => {
  const publish = usePublish(['wss://nos.lol']);

  const { invalidate } = useBoards();

  const { currentBoard, currentTags } = useCurrentBoard();

  const insertHeader = useCallback(
    (header: string) => {
      if (
        !header ||
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
          [...currentTags.headers, header],
          ...currentTags.pins,
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [invalidate, publish, currentBoard, currentTags]
  );

  return {
    insertHeader,
  };
};

export default useInsertHeader;
