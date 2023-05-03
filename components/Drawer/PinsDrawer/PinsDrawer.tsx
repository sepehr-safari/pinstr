import { Layout, Items, Header } from '../Shared';

interface PinsDrawerParams {
  main: React.ReactNode;
  activePin?: string;
  pins: any[];
  eose: boolean;
}

const PinsDrawer = ({ main, activePin, pins, eose }: PinsDrawerParams) => {
  return (
    <>
      <Layout
        drawerId="pins-drawer"
        drawer={
          <>
            <Header inputId="new-pin-input" header="My Pins" />

            <Items activeItem={activePin} items={pins} eose={eose} />
          </>
        }
        main={main}
      />
    </>
  );
};

export default PinsDrawer;
