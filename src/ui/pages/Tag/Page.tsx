import { useParams } from 'react-router-dom';

import { useTag } from '@/logic/queries';

import { MemoizedBoardItem, Spinner } from '@/ui/components';
import { FiltersNavbar } from '@/ui/components/Navbars';

export const Page = () => {
  const { tag } = useParams();

  const { data: boards, status } = useTag(tag);

  if (status == 'loading') {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-screen-4xl">
        <FiltersNavbar />
        <div className="px-4 py-2">
          <div className="mb-4 w-full flex justify-center md:justify-start">
            <div className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-sm">
              {tag}
            </div>
          </div>

          <div className="mx-auto pb-16 overflow-hidden max-w-md sm:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {(boards || []).map((board) => (
                <MemoizedBoardItem key={board.id} board={board} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
