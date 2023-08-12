import { BoardsGrid, FiltersNavbar } from '@/components';

import { useBoards } from '@/queries';

export default function Home() {
  const { data } = useBoards();
  console.log(data);

  return (
    <>
      <FiltersNavbar />
      <BoardsGrid />
    </>
  );
}
