import { usePublish } from 'nostr-hooks';
import { useCallback, useState } from 'react';

import { useBoards } from '@/hooks';

const useNewItemInput = () => {
  const [newBoardInput, setNewBoardInput] = useState('');

  const { invalidate } = useBoards();

  const publish = usePublish(['wss://nos.lol']);

  const handlePublish = useCallback(async () => {
    if (newBoardInput) {
      publish({
        // @ts-ignore
        kind: 33888,
        tags: [
          ['d', newBoardInput],
          ['headers', 'Name'],
        ],
      }).then(invalidate);
      setNewBoardInput('');
    }
  }, [newBoardInput, invalidate, publish]);

  const handleOnChange = useCallback(
    (e: any) => setNewBoardInput(e.target.value),
    []
  );

  const handleOnKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        handlePublish();
      }
    },
    [handlePublish]
  );

  return {
    newBoardInput,
    handleOnChange,
    handleOnKeyDown,
    handlePublish,
  };
};

export default useNewItemInput;
