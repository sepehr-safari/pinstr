'use client';

import { useBoards } from '@/hooks';

import { BoardsDrawer } from '@/components';

const MyLayout = ({ children }: { children: React.ReactNode }) => {
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
      <BoardsDrawer main={children} />
    </>
  );
};

export default MyLayout;
