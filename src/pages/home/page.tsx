import { BoardsExplorer, FeaturedBoards, FiltersNavbar } from '@/features';

export const Page = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-4k">
        <div className="p-4 flex flex-col gap-4">
          <FiltersNavbar />
          <FeaturedBoards />
          <BoardsExplorer />
        </div>
      </div>
    </>
  );
};
