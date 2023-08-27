import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';

import { BoardSlideover, PinSlideover } from '@/components';
import { PopoverItem, PopoverTemplate } from '@/components/Popovers';
import { useMutateBoard } from '@/mutations';
import { Board } from '@/types';

export const EditBoardPopover = ({ board }: { board: Board }) => {
  const [openBoardEdit, setOpenBoardEdit] = useState(false);
  const [openPinEdit, setOpenPinEdit] = useState(false);

  const { deleteBoard } = useMutateBoard({
    onClose: () => setOpenBoardEdit(false),
    initialBoard: board,
  });

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'Edit Board',
        onClick: () => setOpenBoardEdit(true),
      },
      {
        title: 'Add a Pin to this Board',
        onClick: () => setOpenPinEdit(true),
      },
      {
        title: 'Remove Board',
        color: 'text-red-600',
        onClick: () => deleteBoard.mutate(),
      },
    ],
    [setOpenBoardEdit, setOpenPinEdit, deleteBoard]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="text-white rounded-full p-2 duration-200 hover:bg-white/20">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </PopoverTemplate>

      <BoardSlideover
        open={openBoardEdit}
        onClose={() => setOpenBoardEdit(false)}
        initialBoard={board}
      />
      <PinSlideover
        open={openPinEdit}
        onClose={() => setOpenPinEdit(false)}
        initialBoard={board}
        initialPinIndex={-1}
      />
    </>
  );
};
