import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';

export const useCreateBoard = () => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return {
    createBoard: () => {
      setBoard({});
      setSearchParams(
        (searchParams) => {
          searchParams.set('action', 'create-board');
          return searchParams;
        },
        { replace: true }
      );
    },
  };
};
