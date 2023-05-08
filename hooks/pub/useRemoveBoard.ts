import { useRouter } from 'next/navigation';
import { usePublish } from 'nostr-hooks';
import { useCallback } from 'react';

const useRemoveBoard = () => {
  const router = useRouter();

  const publish = usePublish(['wss://nos.lol']);

  const removeBoard = useCallback(
    (board: Board, invalidate: () => void) => {
      publish({ kind: 5, tags: [['e', board.id]] }).then(invalidate);
      router.push('/my');
    },
    [publish]
  );

  return {
    removeBoard,
  };
};

export default useRemoveBoard;
