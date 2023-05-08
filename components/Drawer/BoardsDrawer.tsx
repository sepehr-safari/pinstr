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
  const { boards, eose, invalidate } = useBoards({ pubkey, enabled: !!pubkey });

  const { removeBoard } = useRemoveBoard();

  return (
    <>
      <Layout
        drawerId="boards-drawer"
        drawer={
          <>
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
          </>
        }
        main={main}
      />
    </>
  );
};

export default BoardsDrawer;
