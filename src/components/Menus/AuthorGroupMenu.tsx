import { useState } from 'react';

import { MenuTemplate } from '@/components/Menus';

const groups = [
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
  const [selected, setSelected] = useState<string>(groups[0].name);

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
