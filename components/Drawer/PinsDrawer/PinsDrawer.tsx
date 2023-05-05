'use client';

import { PaperClipIcon } from '@heroicons/react/24/outline';

import { useBoards, useRemovePin } from '@/hooks';

import { Header, Item, ItemsLoading, Layout } from '../Shared';

type PinsDrawerParams = {
  board: string | undefined;
  main: React.ReactNode;
  activePin: string | undefined;
};

const PinsDrawer = ({ board, main, activePin }: PinsDrawerParams) => {
  const { boards } = useBoards();
  const { removePin } = useRemovePin(board);

  const pins = board ? boards.get(board) : undefined;

  if (!pins || pins.size === 0) {
    return <>{main}</>;
  }

  return (
    <>
      <Layout
        drawerId="pins-drawer"
        drawer={
          <>
            <Header inputId="new-pin-input" header="My Pins" />

            <ItemsLoading items={pins} />

            {Array.from(pins).map(([name]) => (
              <Item
                key={name}
                name={name}
                icon={<PaperClipIcon />}
                isActive={name === activePin}
                removeHandler={() => removePin(name)}
              />
            ))}
          </>
        }
        main={main}
      />
    </>
  );
};

export default PinsDrawer;
