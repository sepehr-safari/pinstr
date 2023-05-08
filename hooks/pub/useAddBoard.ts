import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useAddBoard = () => {
  const publish = usePublish(['wss://nos.lol']);

  const addBoard = useCallback(
    async (boardName: string, invalidate: () => void) => {
      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', boardName],
          ['headers', 'Name'],
        ],
      }).then(invalidate);
    },
    [publish]
  );

  return {
    addBoard,
  };
};

export default useAddBoard;
