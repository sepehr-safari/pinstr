'use client';

import { useParams } from 'next/navigation';

import { PinsDrawer } from '@/components';
import { usePins } from '@/hooks';

// const boards = [
//   'Best Nostr Clients',
//   'Most Handsome Nostr Users',
//   'Best Movies in History',
//   'Best Nostr Development Tools',
//   'Top Nostr Chatrooms',
// ];

// const pins = ['Damus', 'Primal', 'Coracle', 'Iris', 'Nostribe'];

export default function MyBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const boardId = params ? params?.boardId : undefined;
  const pinId = params ? params?.pinId : undefined;

  const { pins, eose } = usePins(boardId);

  return (
    <>
      <PinsDrawer main={children} activePin={pinId} pins={pins} eose={eose} />
    </>
  );
}
