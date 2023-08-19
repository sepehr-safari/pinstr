import { useState } from 'react';

import { MenuItem, MenuTemplate } from '@/components/Menus';

const groups: MenuItem[] = [
  {
    title: 'Explore',
    description: 'Boards from everyone',
  },
  {
    title: 'Following',
    description: 'Boards from your following',
  },
];

export const AuthorGroupMenu = () => {
  const [selected, setSelected] = useState<MenuItem>(groups[0]);

  return (
    <>
      <MenuTemplate
        items={groups}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};
