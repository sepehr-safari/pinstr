'use client';

import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

import { PinsDrawer } from '@/components';

const MyBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const board = params ? decodeURIComponent(params.board) : undefined;
  const pin = params ? decodeURIComponent(params.pin) : undefined;

  const { boards } = useBoards();

  return (
    <>
      {board && boards.has(board) && (
        <PinsDrawer board={board} main={children} activePin={pin} />
      )}
    </>
  );
};

export default MyBoardLayout;
