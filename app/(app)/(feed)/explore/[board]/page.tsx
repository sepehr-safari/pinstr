'use client';

import { useBoards, useCurrentParams } from '@/hooks';

import { BoardCard } from '@/components';

const ExploreBoard = () => {
  const { boardName } = useCurrentParams();

  const { boards } = useBoards({
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
                  pubkey={board.pubkey}
                  boardName={board.name}
                />
              );
            }
          })
        : null}
    </>
  );
};

export default ExploreBoard;
