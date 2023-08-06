import { useState } from 'react';

import { MenuTemplate } from '@/components';

import { MenuItem } from './MenuTemplate.types';

const kinds: MenuItem[] = [
  {
    name: 'Generic Boards (Kind 33888)',
    description:
      'Boards of everything (e.g. links, images, videos, texts, etc.)',
  },
  {
    name: 'Nostr Profiles (Kind 30000)',
    description: 'Boards of nostr profiles (npub1...)',
  },
  {
    name: 'Nostr Notes (Kind 30001)',
    description: 'Boards of nostr notes (note1..., naddr1...)',
  },
];

const KindMenu = () => {
  const [selected, setSelected] = useState<string>(kinds[0].name);

  return (
    <>
      <MenuTemplate
        items={kinds}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default KindMenu;
