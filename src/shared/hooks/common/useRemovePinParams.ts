import { useSearchParams } from 'react-router-dom';

import { Board } from '@/logic/types';

export const useRemovePinParams = (
  board: Partial<Board> | undefined,
  pinIndex: number | undefined
) => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setRemovePinParams: () => {
      if (board && pinIndex != undefined) {
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'remove-pin');
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
