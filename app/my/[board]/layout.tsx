'use client';

import { useBoards, useCurrentBoard } from '@/hooks';

import { PinsDrawer } from '@/components';

const MyBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentBoard } = useCurrentBoard();

  const { boards } = useBoards();

  return (
    <>
      {currentBoard.name && !!boards[currentBoard.name] && (
        <PinsDrawer main={children} />
      )}
    </>
  );
};

export default MyBoardLayout;
