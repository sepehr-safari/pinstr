'use client';

import { FolderIcon } from '@heroicons/react/24/outline';

import { useBoards, useRemoveBoard } from '@/hooks';

import { Layout, Header, NewItemInput, ItemsLoading, Item } from '../Shared';

type BoardsDrawerParams = {
  main: React.ReactNode;
  activeBoard?: string;
};

const BoardsDrawer = ({ main, activeBoard }: BoardsDrawerParams) => {
  const { boards } = useBoards();
  const { removeBoard } = useRemoveBoard();

  return (
    <>
      <Layout
        drawerId="boards-drawer"
        drawer={
          <>
            <Header inputId="new-board-input" header="My Boards" />

            <ItemsLoading items={boards} />

            {Array.from(boards).map(([name]) => (
              <Item
                key={name}
                name={name}
                icon={<FolderIcon />}
                isActive={name === activeBoard}
                removeHandler={() => removeBoard(name)}
              />
            ))}

            <NewItemInput inputId="new-board-input" />
          </>
        }
        main={main}
      />
    </>
  );
};

export default BoardsDrawer;
