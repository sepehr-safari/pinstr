'use client';

import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

import { BoardsDrawer } from '@/components';

// const boards = [
//   'Best Nostr Clients',
//   'Most Handsome Nostr Users',
//   'Best Movies in History',
//   'Best Nostr Development Tools',
//   'Top Nostr Chatrooms',
// ];

export default function MyLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const boardId = params ? params?.boardId : undefined;

  const { pubkey, boards, eose } = useBoards();

  if (!pubkey) {
    return (
      <>
        <p>Not logged in</p>
      </>
    );
  }

  return (
    <>
      <BoardsDrawer
        main={children}
        activeBoard={boardId}
        boards={boards}
        eose={eose}
      />
    </>
  );
}
