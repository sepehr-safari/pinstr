import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';

export const useCreatePin = (board: Partial<Board> | undefined) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    createPin: () => {
      if (board) {
        setBoard(board);
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'create-pin');
            board.pins && searchParams.set('i', board.pins.length.toString());
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
