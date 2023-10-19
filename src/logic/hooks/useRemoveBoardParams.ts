import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { NDKBoard } from '@/logic/types';

export const useRemoveBoardParams = (board: Partial<NDKBoard> | undefined) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    setRemoveBoardParams: () => {
      if (board) {
        setBoard(board);
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'remove-board');
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
