import { useEffect } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const boardTypeMenuItems: MenuItem[] = [
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
    setSelected(boardTypeMenuItems[0]);
  }, []);

  return (
    <>
      <MenuTemplate
        items={boardTypeMenuItems}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
