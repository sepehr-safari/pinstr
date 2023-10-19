import { useInView } from 'react-intersection-observer';

import { useBoards } from '@/logic/queries';

import { MemoizedBoardItem, Spinner } from '@/ui/components';
import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

export const BoardsByAuthor = () => {
  const { ref } = useInView();

  const { npub } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { boards, status, loadMore, hasMore } = useBoards({ author, enabled: !!author });

  // const safeFetchNextPage = useCallback(() => {
  //   if (hasNextPage && !isFetchingNextPage && !isFetching) {
  //     fetchNextPage();
  //   }
  // }, [hasNextPage, isFetchingNextPage, isFetching]);

  // useEffect(() => {
  //   if (inView) {
  //     safeFetchNextPage();
  //   }
  // }, [inView]);

  if (status == 'loading') {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (status == 'empty') {
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
          <MemoizedBoardItem key={board.id} board={board} />
        ))}
      </div>

      <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore}
        className="mt-20 mx-auto block text-gray-700 bg-gray-100 text-xs px-4 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
      >
        {hasMore ? 'Load More' : 'Nothing more to load'}
      </button>
    </div>
  );
};
