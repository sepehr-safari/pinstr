'use client';

import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

import { BoardsDrawer } from '@/components';

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const board = params ? decodeURIComponent(params.board) : undefined;

  const { pubkey } = useBoards();

  if (!pubkey) {
    return (
      <>
        <p>Not logged in</p>
      </>
    );
  }

  return (
    <>
      <BoardsDrawer main={children} activeBoard={board} />
    </>
  );
};

export default MyLayout;
