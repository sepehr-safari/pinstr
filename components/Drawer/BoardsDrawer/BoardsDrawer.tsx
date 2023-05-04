import { useBoards } from '@/hooks';

import { Layout, Items, Header, NewItemInput } from '../Shared';

interface BoardsDrawerParams {
  main: React.ReactNode;
  activeBoard?: string;
}

const BoardsDrawer = ({ main, activeBoard }: BoardsDrawerParams) => {
  const { boards, eose } = useBoards();

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
