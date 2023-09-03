import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';

export const useRemovePin = (board: Board | undefined, pinIndex: number | undefined) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    removePin: () => {
      if (board && pinIndex != undefined) {
        setBoard(board);
        setSearchParams(
          (searchParams) => {
            searchParams.set('action', 'remove-pin');
            searchParams.set('i', pinIndex.toString());
            return searchParams;
          },
          { replace: true }
        );
      }
    },
  };
};
