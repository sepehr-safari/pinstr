import { MemoizedBoardItem } from '@/features';

import { Spinner, Text } from '@/shared/components';

import { useBoardsExplorer } from './hooks';

export const BoardsExplorer = () => {
  const { boards, isEmpty, isPending } = useBoardsExplorer();

  // useEffect(() => {
  //   if (!isFetching && inView) {
  //     loadMore();
  //   }
  // }, [isFetching, inView, loadMore]);

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
      <Text variant="h3">{`Recent Boards`}</Text>

      <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
        {boards.map((board) => (
          <MemoizedBoardItem key={board.event.id} board={board} />
        ))}
      </div>

      {/* <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isFetching}
        className="mt-4 mx-auto block text-transparent bg-transparent text-xs px-4 py-1"
      >
        {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button> */}
    </div>
  );
};
