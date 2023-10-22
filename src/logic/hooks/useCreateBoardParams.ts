import { useSearchParams } from 'react-router-dom';

export const useCreateBoardParams = () => {
  const [_, setSearchParams] = useSearchParams();

  return {
    setCreateBoardParams: () => {
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
