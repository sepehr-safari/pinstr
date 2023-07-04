'use client';

import { PaperClipIcon, PlusIcon } from '@heroicons/react/24/outline';

import { useBoards, useCurrentParams, useRemovePin } from '@/hooks';

import { Header, Item, ItemsLoading, Layout } from './Shared';
import { usePubkey } from 'nostr-hooks';
import Link from 'next/link';

type PinsDrawerParams = {
  main: React.ReactNode;
};

const PinsDrawer = ({ main }: PinsDrawerParams) => {
  const pubkey = usePubkey();
  const { boardName, pinName } = useCurrentParams();
  const { boards, eose, invalidate } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });
  const currentBoard = boards.find((board) => board.name === boardName);

  const { removePin } = useRemovePin();

  if (!currentBoard || !currentBoard.pins.length) {
    return <>{main}</>;
  }

  return (
    <>
      <Layout
        drawerId="pins-drawer"
        drawer={
          <ul className="menu menu-compact w-80 h-full bg-base-200 border-r-2 border-neutral">
            <Header>
              <Link
                prefetch={false}
                href={`/my/${encodeURIComponent(currentBoard.name)}`}
                className="btn btn-xs btn-square btn-ghost"
              >
                <PlusIcon className="w-5 h-5" />
              </Link>
            </Header>

            <ItemsLoading items={currentBoard.pins} eose={eose} />

            {currentBoard.pins.map((pin) => (
              <Item
                key={pin[0]}
                name={pin[0]}
                icon={<PaperClipIcon />}
                href={`/my/${encodeURIComponent(
                  currentBoard.name
                )}/${encodeURIComponent(pin[0])}`}
                isActive={pin[0] === pinName}
                removeHandler={() => removePin(pin, currentBoard, invalidate)}
              />
            ))}
          </ul>
        }
        main={main}
      />
    </>
  );
};

export default PinsDrawer;
