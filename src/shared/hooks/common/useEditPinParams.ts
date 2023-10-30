import { useSearchParams } from 'react-router-dom';

import { Board } from '@/logic/types';

export const useEditPinParams = (
  board: Partial<Board> | undefined,
  pinIndex: number | undefined
) => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setEditPinParams: () => {
      if (board && pinIndex != undefined) {
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'edit-pin');
            board.title && searchParams.set('title', board.title);
            searchParams.set('i', pinIndex.toString());

            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
