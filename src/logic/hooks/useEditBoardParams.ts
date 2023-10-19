import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { NDKBoard } from '@/logic/types';

export const useEditBoardParams = (board: Partial<NDKBoard> | undefined) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    setEditBoardParams: () => {
      if (board) {
        setBoard(board);
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'edit-board');
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
