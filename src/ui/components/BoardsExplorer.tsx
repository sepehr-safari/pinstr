import { useBoards } from '@/logic/queries';

import { MemoizedBoardItem, Spinner } from '@/ui/components';

export const BoardsExplorer = () => {
  const { data: boards, status } = useBoards();

  if (status == 'loading') {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!boards || boards.length == 0) {
    return <div>No Boards Found!</div>;
  }

  return (
    <div className="pb-16 overflow-hidden">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
        {(boards || []).map((board) => (
          <MemoizedBoardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};
