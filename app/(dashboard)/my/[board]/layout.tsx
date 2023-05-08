'use client';

import { usePubkey } from 'nostr-hooks';

import { useBoards, useCurrentParams } from '@/hooks';

import { PinsDrawer } from '@/components';

const MyBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const pubkey = usePubkey();
  const { boardName } = useCurrentParams();
  const { boards } = useBoards({ pubkey, enabled: !!pubkey });
  const currentBoard = boards.find((board) => board.name === boardName);

  if (!currentBoard) {
    return <>{children}</>;
  }

  return <PinsDrawer main={children} />;
};

export default MyBoardLayout;
