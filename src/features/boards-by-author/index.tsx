import { useEffect } from 'react';

import { MemoizedBoardItem } from '@/features';
import { Spinner } from '@/shared/components';

import { useBoardsByAuthor } from './hooks';

export const BoardsByAuthor = () => {
  const { boards, hasMore, isEmpty, isFetching, isPending, loadMore, ref, inView } =
    useBoardsByAuthor();

  useEffect(() => {
    if (!isFetching && inView) {
      loadMore();
    }
  }, [isFetching, inView, loadMore]);

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isEmpty) {
    return <div>No Boards Found!</div>;
  }

  return (
    <div className="pb-16 overflow-hidden">
      <div
        className={
          'grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4 5xl:grid-cols-5'
        }
      >
        {boards.map((board) => (
          <MemoizedBoardItem key={board.event.id} board={board} />
        ))}
      </div>

      <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isFetching}
        className="mt-20 mx-auto block text-gray-700 bg-gray-100 text-xs px-4 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
      >
        {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button>
    </div>
  );
};
