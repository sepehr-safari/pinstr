import { MenuItem, MenuTemplate } from '@/ui/components/Menus';

const formatMenuItems: MenuItem[] = [
  {
    title: 'All Formats',
  },
  {
    title: 'Text',
  },
  {
    title: 'Link',
  },
  {
    title: 'Image',
  },
  {
    title: 'Video',
  },
  {
    title: 'Profile',
  },
  {
    title: 'Note',
  },
];

export const FormatMenu = ({
  selected,
  setSelected,
}: {
  selected: string | undefined;
  setSelected: (item: string) => void;
}) => {
  return (
    <>
      <MenuTemplate items={formatMenuItems} selected={selected} setSelected={setSelected} />
    </>
  );
};
