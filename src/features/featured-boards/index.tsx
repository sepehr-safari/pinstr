import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Spinner, Text } from '@/shared/components';

import { FeaturedBoardItem } from './featured-board-item';
import { useFeaturedBoards } from './hooks';

export const FeaturedBoards = () => {
  const { boards, loadMore, hasMore, isEmpty, isPending, isFetching } = useFeaturedBoards();

  return (
    <div className="overflow-hidden">
      <Text variant="h3">{`Featured Boards`}</Text>

      {isEmpty ? (
        <></>
      ) : isPending ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={boards.length}
          next={loadMore}
          hasMore={hasMore && !isFetching}
          loader={<></>}
          className="mt-4"
        >
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 600: 2, 900: 3, 1200: 4, 1500: 5, 1900: 6, 2200: 7 }}
          >
            <Masonry gutter="0.25rem">
              {boards.map((board) => (
                <FeaturedBoardItem key={board.event.id} board={board} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      )}
    </div>
  );
};
