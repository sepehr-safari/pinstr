'use client';

import { usePubkey } from 'nostr-hooks';

import { BoardsDrawer } from '@/components';

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const pubkey = usePubkey();

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
