import { useEffect } from 'react';

import { MenuItem, MenuTemplate } from '@/components/Menus';

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

export const BoardTypeMenu = ({
  selected,
  setSelected,
}: {
  selected: MenuItem | null;
  setSelected: (item: MenuItem) => void;
}) => {
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
};
