import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useInsertHeader = () => {
  const publish = usePublish(['wss://nos.lol']);

  const insertHeader = useCallback(
    (header: string, board: Board, invalidate: () => void) => {
      if (!header || board.headers.length === 0) {
        return;
      }

      const newHeaders = ['headers', ...board.headers];
      if (!board.headers.includes(header)) newHeaders.push(header);

      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', board.name],
          ['avatar', board.avatar],
          newHeaders,
          ...board.pins.map((p) => ['pin', ...p]),
        ],
      }).then((event) => {
        if (!event) return;

        invalidate();
      });
    },
    [publish]
  );

  return {
    insertHeader,
  };
};

export default useInsertHeader;
