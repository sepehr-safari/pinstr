import { Layout, Items, Header, NewItemInput } from '../Shared';

interface BoardsDrawerParams {
  main: React.ReactNode;
  activeBoard?: string;
  boards: any[];
  eose: boolean;
}

const BoardsDrawer = ({
  main,
  activeBoard,
  boards,
  eose,
}: BoardsDrawerParams) => {
  return (
    <>
      <Layout
        drawerId="boards-drawer"
        drawer={
          <>
            <Header inputId="new-board-input" header="My Boards" />

            <Items activeItem={activeBoard} items={boards} eose={eose} />

            <NewItemInput inputId="new-board-input" />
          </>
        }
        main={main}
      />
    </>
  );
};

export default BoardsDrawer;
