import { BoardsExplorer } from '@/ui/components';
import { FiltersNavbar } from '@/ui/components/Navbars';

export const Page = () => {
  return (
    <>
      <div className="mx-auto max-w-md sm:max-w-screen-4xl p-4 flex flex-col gap-4">
        <FiltersNavbar />
        <BoardsExplorer />
      </div>
    </>
  );
};
