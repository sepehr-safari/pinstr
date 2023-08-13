import { useState } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const groups: MenuItem[] = [
  {
    name: 'Explore',
    description: 'Boards from everyone',
  },
  {
    name: 'Following',
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
