'use client';

import { FolderIcon } from '@heroicons/react/24/outline';
import { usePubkey } from 'nostr-hooks';

import { useBoards, useCurrentParams, useRemoveBoard } from '@/hooks';

import { Header, Item, ItemsLoading, Layout, NewItemInput } from './Shared';

type BoardsDrawerParams = {
  main: React.ReactNode;
};

const BoardsDrawer = ({ main }: BoardsDrawerParams) => {
  const { boardName } = useCurrentParams();

  const pubkey = usePubkey();
  const { boards, eose, invalidate } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });

  const { removeBoard } = useRemoveBoard();

  return (
    <>
      <Layout
        drawerId="boards-drawer"
        drawer={
          <ul className="menu menu-compact w-80 bg-base-200 border-r-[1px] border-neutral">
            <Header inputId="new-board-input" header="My Boards" />

            <ItemsLoading items={boards} eose={eose} />

            {boards.map((board) => (
              <Item
                key={board.name}
                name={board.name}
                icon={<FolderIcon />}
                href={`/my/${board.name}`}
                isActive={board.name === boardName}
                removeHandler={() => removeBoard(board, invalidate)}
              />
            ))}

            <NewItemInput inputId="new-board-input" />
          </ul>
        }
        main={main}
      />
    </>
  );
};

export default BoardsDrawer;
