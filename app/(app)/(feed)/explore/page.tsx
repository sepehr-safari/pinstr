'use client';

import { useBoards } from '@/hooks';

import BoardCard from '@/components/BoardCard';

const FeedExplore = () => {
  const { boards } = useBoards({ enabled: true });

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

export default FeedExplore;
