import { BoardsExplorer } from '@/ui/components';
import { FiltersNavbar } from '@/ui/components/Navbars';

export const Page = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-4xl">
        <FiltersNavbar />
        <div className="p-4 sm:p-6">
          <BoardsExplorer />
        </div>
      </div>
    </>
  );
};
