'use client';

import { PaperClipIcon } from '@heroicons/react/24/outline';

import { useCurrentBoard, useRemovePin } from '@/hooks';

import { Header, Item, ItemsLoading, Layout } from '../Shared';

type PinsDrawerParams = {
  main: React.ReactNode;
};

const PinsDrawer = ({ main }: PinsDrawerParams) => {
  const { currentBoard, currentPin } = useCurrentBoard();
  const { removePin } = useRemovePin();

  if (!currentBoard.pins || Object.keys(currentBoard.pins).length === 0) {
    return <>{main}</>;
  }

  return (
    <>
      <Layout
        drawerId="pins-drawer"
        drawer={
          <>
            <Header inputId="new-pin-input" header="My Pins" />

            <ItemsLoading items={currentBoard.pins} />

            {Object.keys(currentBoard.pins).map((name) => (
              <Item
                key={name}
                name={name}
                icon={<PaperClipIcon />}
                href={`/my/${currentBoard.name}/${name}`}
                isActive={name === currentPin.name}
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
