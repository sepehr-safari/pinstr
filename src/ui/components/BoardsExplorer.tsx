import { useBoardsExplorer } from '@/logic/queries';

import { MemoizedBoardItem } from '@/ui/components';

export const BoardsExplorer = () => {
  const { data: boards } = useBoardsExplorer();

  return (
    <div className="mx-auto pb-16 overflow-hidden max-w-md sm:max-w-none">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {(boards || []).map((board) => (
          <MemoizedBoardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};
