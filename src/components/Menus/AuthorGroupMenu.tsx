import { useState } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

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

const AuthorGroupMenu = () => {
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

export default AuthorGroupMenu;
