import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { MemoizedBoardItem } from '@/features';
import { Spinner } from '@/shared/components';

import { useBoardsByAuthor } from './hooks';

export const BoardsByAuthor = () => {
  const { boards, hasMore, isEmpty, isFetching, isPending, loadMore } = useBoardsByAuthor();

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
      <InfiniteScroll
        dataLength={boards.length}
        next={loadMore}
        hasMore={hasMore && !isFetching}
        loader={<></>}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 600: 2, 900: 3, 1200: 4, 1500: 5, 1900: 6, 2200: 7 }}
        >
          <Masonry gutter="0.25rem">
            {boards.map((board) => (
              <MemoizedBoardItem key={board.event.id} board={board} hideAuthor />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  );
};
