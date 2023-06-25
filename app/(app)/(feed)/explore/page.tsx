'use client';

import { useBoards } from '@/hooks';

import { BoardCard, NoBoards } from '@/components';

const FeedExplore = () => {
  const { boards, eose, loadMore } = useBoards({
    enabled: true,
    autoInvalidate: true,
  });

  if (boards.length === 0) {
    if (eose) {
      return <NoBoards />;
    } else {
      return (
        <>
          <span className="loading loading-bars loading-lg fixed top-1/2 left-1/2 z-50" />
        </>
      );
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards.length > 0
          ? boards.map((board) => {
              if (board.pins.length > 0) {
                return (
                  <BoardCard
                    key={board.id}
                    boardAuthor={board.pubkey}
                    boardName={board.name}
                  />
                );
              }
            })
          : null}
      </div>

      <button className="btn btn-wide bg-neutral mt-4" onClick={loadMore}>
        Load More
      </button>
    </>
  );
};

export default FeedExplore;
