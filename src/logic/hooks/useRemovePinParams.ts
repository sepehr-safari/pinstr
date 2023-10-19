import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { NDKBoard } from '@/logic/types';

export const useRemovePinParams = (
  board: Partial<NDKBoard> | undefined,
  pinIndex: number | undefined
) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    setRemovePinParams: () => {
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
