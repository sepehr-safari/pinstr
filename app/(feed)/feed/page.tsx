'use client';

import BoardCard from '@/components/BoardCard';
import { useBoards } from '@/hooks';
import { useState } from 'react';

const Feed = () => {
  const [until, setUntil] = useState<number | undefined>(undefined);
  const { boards } = useBoards({ enabled: true, until });

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

export default Feed;
