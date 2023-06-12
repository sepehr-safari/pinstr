'use client';

import { FolderIcon } from '@heroicons/react/24/outline';
import { usePubkey } from 'nostr-hooks';

import { useBoards, useCurrentParams, useRemoveBoard } from '@/hooks';

import { Header, Item, ItemsLoading, Layout, NewItemInput } from './Shared';

import { GithubIcon } from '@/components';

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
          <div className="menu menu-compact w-80 bg-base-200 border-r-2 border-neutral">
            <Header inputId="new-board-input" header="My Boards" />

            <ItemsLoading items={boards} eose={eose} />

            <ul>
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
            </ul>

            <NewItemInput inputId="new-board-input" />

            <div className="fixed bottom-20 w-full">
              <div className="text-sm text-neutral-500 inline-flex items-center justify-center gap-2 w-full">
                <span>Made with &#10084; by Sepehr</span>
                <a href="https://github.com/sepehr-safari/pinstr">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
        }
        main={main}
      />
    </>
  );
};

export default BoardsDrawer;
