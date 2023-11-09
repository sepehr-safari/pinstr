import { Menu, type MenuItem } from '@/shared/components';

import { AUTHOR_FILTER_MENU_ITEMS } from './config';

type Props = {
  selected: string | undefined;
  setSelected: (item: MenuItem) => void;
};

export const AuthorGroupMenu = ({ selected, setSelected }: Props) => (
  <Menu
    items={AUTHOR_FILTER_MENU_ITEMS}
    label={selected ?? AUTHOR_FILTER_MENU_ITEMS[0].title}
    onSelect={setSelected}
  />
);
