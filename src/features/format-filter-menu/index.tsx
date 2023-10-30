import { Menu, type MenuItem } from '@/shared/components';

import { FORMAT_FILTER_MENU_ITEMS } from './config';

export * from './config';

type Props = {
  selected: string | undefined;
  setSelected: (item: MenuItem) => void;
};

export const FormatFilterMenu = ({ selected, setSelected }: Props) => (
  <Menu
    items={FORMAT_FILTER_MENU_ITEMS}
    label={selected ?? FORMAT_FILTER_MENU_ITEMS[0].title}
    onSelect={setSelected}
    variant="outline"
  />
);
