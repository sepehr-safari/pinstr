import { Menu, type MenuItem } from '@/shared/components';

import { FORMAT_FILTER_MENU_ITEMS } from './config';

export * from './config';

type Props = {
  selected: string | undefined;
  setSelected: (item: MenuItem) => void;
  hideFirstOption?: boolean;
  disabled?: boolean;
};

export const FormatFilterMenu = ({ selected, setSelected, hideFirstOption, disabled }: Props) => {
  const formatFilterMenuItems = !hideFirstOption
    ? FORMAT_FILTER_MENU_ITEMS
    : FORMAT_FILTER_MENU_ITEMS.slice(1);

  return (
    <Menu
      items={formatFilterMenuItems}
      label={selected ?? formatFilterMenuItems[0].title}
      onSelect={setSelected}
      variant="outline"
      disabled={disabled}
    />
  );
};
