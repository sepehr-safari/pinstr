import { useEffect } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const boardTypeItems: MenuItem[] = [
  {
    name: 'All Board Types',
  },
  {
    name: 'Plain Texts',
  },
  {
    name: 'Links',
  },
  {
    name: 'Images',
  },
  {
    name: 'Videos',
  },
  {
    name: 'NOSTR Profiles',
  },
  {
    name: 'NOSTR Notes',
  },
];

export default function BoardTypeMenu({
  selected,
  setSelected,
}: {
  selected: MenuItem | null;
  setSelected: (item: MenuItem) => void;
}) {
  useEffect(() => {
    setSelected(boardTypeItems[0]);
  }, []);

  return (
    <>
      <MenuTemplate
        items={boardTypeItems}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
