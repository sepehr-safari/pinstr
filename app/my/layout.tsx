'use client';

import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

import { BoardsDrawer } from '@/components';

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const boardId = params ? params?.boardId : undefined;

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
      <BoardsDrawer main={children} activeBoard={boardId} />
    </>
  );
};

export default MyLayout;
