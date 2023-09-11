import { MenuItem, MenuTemplate } from '@/ui/components/Menus';

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

export const AuthorGroupMenu = ({
  selected,
  setSelected,
}: {
  selected: string | undefined;
  setSelected: (item: string) => void;
}) => {
  return (
    <>
      <MenuTemplate items={groups} selected={selected} setSelected={setSelected} />
    </>
  );
};
