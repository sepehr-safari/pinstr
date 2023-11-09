import { useLocation, useSearchParams } from 'react-router-dom';

export const useCommentsParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  return {
    commentsParam: searchParams.get('comments'),
    toggleCommentsParams: () => {
      setSearchParams(
        (searchParams) => {
          const comments = searchParams.get('comments');
          if (comments == null) {
            searchParams.set('comments', 'show');
          } else {
            searchParams.delete('comments');
          }

          return searchParams;
        },
        { replace: true, state: location.state }
      );
    },
  };
};
