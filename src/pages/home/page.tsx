import { BoardsExplorer, FeaturedBoards, FiltersNavbar } from '@/features';

export const Page = () => {
  return (
    <>
      <div className="mx-auto max-w-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl 4xl:max-w-screen-4xl 5xl:max-w-screen-5xl">
        <div className="p-4 flex flex-col gap-4">
          <FiltersNavbar />
          <FeaturedBoards />
          <BoardsExplorer />
        </div>
      </div>
    </>
  );
};
