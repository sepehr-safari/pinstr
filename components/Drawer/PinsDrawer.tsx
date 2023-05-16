'use client';

import { PaperClipIcon } from '@heroicons/react/24/outline';

import { useBoards, useCurrentParams, useRemovePin } from '@/hooks';

import { Header, Item, ItemsLoading, Layout } from './Shared';
import { usePubkey } from 'nostr-hooks';

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
          <ul className="menu menu-compact w-80 bg-base-200 border-r-2 border-neutral">
            <Header inputId="new-pin-input" header="My Pins" />

            <ItemsLoading items={currentBoard.pins} eose={eose} />

            {currentBoard.pins.map((pin) => (
              <Item
                key={pin[0]}
                name={pin[0]}
                icon={<PaperClipIcon />}
                href={`/my/${currentBoard.name}/${pin[0]}`}
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
