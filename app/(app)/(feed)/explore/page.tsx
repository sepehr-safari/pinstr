'use client';

import { useBoards } from '@/hooks';

import { BoardCard } from '@/components';

const FeedExplore = () => {
  const { boards, eose, loadMore } = useBoards({
    enabled: true,
    autoInvalidate: true,
  });

  if (boards.length === 0) {
    if (eose) {
      return (
        <>
          <p>Hello 👋</p>
          <p>No boards!</p>
        </>
      );
    } else {
      return (
        <>
          <button className="loading btn-sm btn btn-wide" />
        </>
      );
    }
  }

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

      <button className="btn btn-wide" onClick={loadMore}>
        Load More
      </button>
    </>
  );
};

export default FeedExplore;
