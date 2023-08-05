import { useState } from 'react';

import { MenuTemplate } from '@/components/Menus';

const kinds = [
  {
    name: 'Generic Boards (Kind 33888)',
    description: 'Pins of everything (e.g. links, images, videos, texts, etc.)',
  },
  {
    name: 'Nostr Profiles (Kind 30000)',
    description: 'Pins of nostr profiles (npub1...)',
  },
  {
    name: 'Nostr Notes (Kind 30001)',
    description: 'Pins of nostr notes (note1...)',
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
