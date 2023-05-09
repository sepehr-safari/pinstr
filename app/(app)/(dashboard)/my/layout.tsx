'use client';

import { usePubkey } from 'nostr-hooks';
import { useEffect, useRef } from 'react';

import { useBoards } from '@/hooks';

import { BoardsDrawer } from '@/components';

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  const isFirstRender = useRef(true);

  const pubkey = usePubkey();
  const { invalidate } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });

  useEffect(() => {
    if (isFirstRender.current === true) {
      isFirstRender.current = false;
      invalidate();
    }
  }, [invalidate]);

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
