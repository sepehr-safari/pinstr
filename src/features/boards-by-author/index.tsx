import { MemoizedBoardItem } from '@/features';

import { Spinner } from '@/shared/components';

import { useBoardsByAuthor } from './hooks';

export const BoardsByAuthor = () => {
  const { boards, isPending, isEmpty } = useBoardsByAuthor();

  // useEffect(() => {
  //   if (inView) {
  //     loadMore();
  //   }
  // }, [inView, loadMore]);

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

      {/* <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isSubscribed}
        className="mt-4 mx-auto block text-transparent bg-transparent text-xs px-4 py-1"
      >
        {isSubscribed ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button> */}
    </div>
  );
};
