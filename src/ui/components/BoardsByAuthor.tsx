import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useBoards } from '@/logic/queries';

import { MemoizedBoardItem, Spinner } from '@/ui/components';

export const BoardsByAuthor = () => {
  const { ref, inView } = useInView();

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useBoards();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status == 'loading') {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!data || data.pages[0].length == 0) {
    return <div>No Boards Found!</div>;
  }

  return (
    <div className="pb-16 overflow-hidden">
      <div
        className={
          'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-5'
        }
      >
        {data.pages.map((page) =>
          page.map((board) => <MemoizedBoardItem key={board.id} board={board} />)
        )}
      </div>

      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="mt-20 mx-auto block text-gray-700 bg-gray-200 text-xs px-4 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </button>
    </div>
  );
};
