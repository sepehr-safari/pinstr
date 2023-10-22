import { useEffect } from 'react';

import { useBoardsExplorer } from '@/logic/hooks';
import { MemoizedBoardItem, Spinner } from '@/ui/components';

export const BoardsExplorer = () => {
  const { boards, loadMore, hasMore, isEmpty, isPending, ref, inView, isFetching } =
    useBoardsExplorer();

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
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
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
