import { usePublish } from 'nostr-hooks';
import { useCallback, useState } from 'react';

import { useBoards } from '@/hooks';

const useDrawerItem = (id: string) => {
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  const { boards } = useBoards();
  const invalidate = () => {};

  const publish = usePublish(['wss://nos.lol']);

  const removeBoard = useCallback(() => {
    publish({ kind: 5, tags: [['e', id]] }).then(invalidate);
  }, [publish, invalidate, id]);

  const confirmRemove = useCallback(() => {
    removeBoard();
    setShowRemoveConfirmation(false);
  }, [removeBoard]);

  return {
    showRemoveConfirmation,
    setShowRemoveConfirmation,
    confirmRemove,
  };
};

export default useDrawerItem;
