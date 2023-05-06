'use client';

import { FolderIcon } from '@heroicons/react/24/outline';

import { useBoards, useCurrentBoard, useRemoveBoard } from '@/hooks';

import { Header, Item, ItemsLoading, Layout, NewItemInput } from '../Shared';

type BoardsDrawerParams = {
  main: React.ReactNode;
};

const BoardsDrawer = ({ main }: BoardsDrawerParams) => {
  const { boards } = useBoards();
  const { removeBoard } = useRemoveBoard();
  const { currentBoard } = useCurrentBoard();

  return (
    <>
      <Layout
        drawerId="boards-drawer"
        drawer={
          <>
            <Header inputId="new-board-input" header="My Boards" />

            <ItemsLoading items={boards} />

            {Object.keys(boards).map((name) => (
              <Item
                key={name}
                name={name}
                icon={<FolderIcon />}
                href={`/my/${name}`}
                isActive={name === currentBoard.name}
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
