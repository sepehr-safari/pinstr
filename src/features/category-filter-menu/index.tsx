import { Menu, type MenuItem } from '@/shared/components';

import { CATEGORY_FILTER_MENU_ITEMS } from './config';

type Props = {
  selected: string | undefined;
  setSelected: (item: MenuItem) => void;
  hideFirstOption?: boolean;
};

export const CategoryFilterMenu = ({ selected, setSelected, hideFirstOption }: Props) => {
  const categoryFilterMenuItems = !hideFirstOption
    ? CATEGORY_FILTER_MENU_ITEMS
    : CATEGORY_FILTER_MENU_ITEMS.slice(1);

  return (
    <Menu
      items={categoryFilterMenuItems}
      label={selected ?? categoryFilterMenuItems[0].title}
      onSelect={setSelected}
      variant="outline"
    />
  );
};
