import { useMemo } from 'react';

import { usePins } from '@/hooks';

import { Layout, Items, Header } from '../Shared';

interface PinsDrawerParams {
  boardId: string | undefined;
  main: React.ReactNode;
  activePin: string | undefined;
}

const PinsDrawer = ({ boardId, main, activePin }: PinsDrawerParams) => {
  const { pins, eose } = usePins(boardId);
  // console.log(pins);
  const items = useMemo(
    () => pins.map((pin) => ({ id: pin.id, name: pin['Title'] })),
    [pins]
  );

  if (items.length === 0) {
    return <>{main}</>;
  }

  return (
    <>
      <Layout
        drawerId="pins-drawer"
        drawer={
          <>
            <Header inputId="new-pin-input" header="My Pins" />

            <Items
              activeItem={activePin}
              items={[{ id: pins[0].id, name: 'sd' }]}
              eose={eose}
            />
          </>
        }
        main={main}
      />
    </>
  );
};

export default PinsDrawer;
