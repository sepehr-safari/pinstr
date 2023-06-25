'use client';

import { useBoards, useCurrentParams } from '@/hooks';

import { BoardCard } from '@/components';

const ExploreBoard = () => {
  const { boardName } = useCurrentParams();

  const { boards, loadMore } = useBoards({
    boardName,
    enabled: !!boardName,
    autoInvalidate: true,
  });

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

export default ExploreBoard;
