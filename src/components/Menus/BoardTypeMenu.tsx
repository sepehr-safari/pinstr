import { useEffect } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const boardTypeItems: MenuItem[] = [
  {
    title: 'All Board Types',
  },
  {
    title: 'Plain Texts',
  },
  {
    title: 'Links',
  },
  {
    title: 'Images',
  },
  {
    title: 'Videos',
  },
  {
    title: 'NOSTR Profiles',
  },
  {
    title: 'NOSTR Notes',
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
