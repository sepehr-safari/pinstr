import { BoardsExplorer } from '@/components';
import { FiltersNavbar } from '@/components/Navbars';

export const Home = () => {
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
