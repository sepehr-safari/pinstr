import { useSearchParams } from 'react-router-dom';

import type { Board } from '@/shared/types';

export const useEditBoardParams = (board: Partial<Board> | undefined) => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setEditBoardParams: () => {
      if (board) {
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'edit-board');
            board.title && searchParams.set('title', board.title);

            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
