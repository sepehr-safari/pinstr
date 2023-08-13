import { useEffect } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const kinds: MenuItem[] = [
  {
    name: 'Generic Boards (Kind 33889)',
    description:
      'Boards of everything (e.g. links, images, videos, texts, etc.)',
    value: '33889',
  },
  {
    name: 'Nostr Profiles (Kind 30000)',
    description: 'Boards of nostr profiles (npub1...)',
    value: '30000',
  },
  {
    name: 'Nostr Notes (Kind 30001)',
    description: 'Boards of nostr notes (note1..., naddr1...)',
    value: '30001',
  },
];

export default function KindMenu({
  kind,
  setKind,
}: {
  kind: MenuItem | null;
  setKind: (item: MenuItem) => void;
}) {
  useEffect(() => {
    setKind(kinds[0]);
  }, []);

  return (
    <>
      <MenuTemplate items={kinds} selected={kind} setSelected={setKind} />
    </>
  );
}
