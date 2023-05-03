'use client';

import { useParams } from 'next/navigation';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const boards = [
  'Best Nostr Clients',
  'Most Handsome Nostr Users',
  'Best Movies in History',
  'Best Nostr Development Tools',
  'Top Nostr Chatrooms',
];

const pins = ['Damus', 'Primal', 'Coracle', 'Iris', 'Nostribe'];

export default function MyPinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const activeIndex = params ? +params?.pinId : undefined;

  return <>{children}</>;
}
