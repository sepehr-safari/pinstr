import { Spinner, Text } from '@/shared/components';

import { FeaturedBoardItem } from './featured-board-item';
import { useFeaturedBoards } from './hooks';

export const FeaturedBoards = () => {
  const { boards, isEmpty, isPending } = useFeaturedBoards();

  return (
    <div className="overflow-hidden">
      <Text variant="h3">{`Featured Boards`}</Text>

      {isPending ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : isEmpty ? (
        <></>
      ) : (
        <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
          {boards.map((board) => (
            <FeaturedBoardItem key={board.event.id} board={board} />
          ))}
        </div>
      )}

      {/* <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isFetching}
        className="mx-auto block text-transparent bg-transparent text-xs px-4 py-1"
      >
        {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button> */}
    </div>
  );
};
