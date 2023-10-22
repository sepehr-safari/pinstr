import { useSearchParams } from 'react-router-dom';

import { Board } from '@/logic/types';

export const useCreatePinParams = (board: Partial<Board> | undefined) => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setCreatePinParams: () => {
      if (board) {
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'create-pin');
            board.title && searchParams.set('title', board.title);
            board.pins && searchParams.set('i', board.pins.length.toString());
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
