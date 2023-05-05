import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

import useBoards from './useBoards';

const useRemoveBoard = () => {
  const { events, invalidate } = useBoards();

  const publish = usePublish(['wss://nos.lol']);

  const removeBoard = useCallback(
    (board: string) => {
      const id = events.find((event) => event.tags[0][1] === board)?.id;
      if (!id) return;

      publish({ kind: 5, tags: [['e', id]] }).then(invalidate);
    },
    [publish, invalidate, events]
  );

  return {
    removeBoard,
  };
};

export default useRemoveBoard;
