'use client';

import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

import { PinsDrawer } from '@/components';

const MyBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const boardId = params ? params.boardId : undefined;
  const pinId = params ? params.pinId : undefined;

  const { boards } = useBoards();

  return (
    <>
      {boards.find((b) => b.id === boardId) && (
        <PinsDrawer boardId={boardId} main={children} activePin={pinId} />
      )}
    </>
  );
};

export default MyBoardLayout;
