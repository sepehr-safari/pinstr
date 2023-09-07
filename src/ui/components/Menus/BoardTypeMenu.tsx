import { MenuItem, MenuTemplate } from '@/ui/components/Menus';

const boardTypeMenuItems: MenuItem[] = [
  {
    title: 'All Board Types',
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

export const BoardTypeMenu = ({
  selected,
  setSelected,
}: {
  selected: string | undefined;
  setSelected: (item: string) => void;
}) => {
  return (
    <>
      <MenuTemplate items={boardTypeMenuItems} selected={selected} setSelected={setSelected} />
    </>
  );
};
