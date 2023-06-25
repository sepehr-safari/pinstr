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

      <button className="btn btn-wide bg-neutral" onClick={loadMore}>
        Load More
      </button>
    </>
  );
};

export default ExploreBoard;
