import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { PopoverItem, PopoverTemplate } from '@/components/Popovers';
import { useMutateBoard } from '@/mutations';
import { Board } from '@/types';

export const EditBoardPopover = ({
  board,
  onOpenBoardEdit,
  onOpenPinEdit,
  onCloseBoardEdit,
}: {
  board: Board;
  onOpenBoardEdit: () => void;
  onOpenPinEdit: () => void;
  onCloseBoardEdit: () => void;
}) => {
  const { deleteBoard } = useMutateBoard({
    onClose: onCloseBoardEdit,
    initialBoard: board,
  });

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'Edit Board',
        onClick: onOpenBoardEdit,
      },
      {
        title: 'Add a Pin to this Board',
        onClick: onOpenPinEdit,
      },
      {
        title: 'Remove Board',
        color: 'text-red-600',
        onClick: () => deleteBoard.mutate(),
      },
    ],
    [onOpenPinEdit, onOpenBoardEdit, onCloseBoardEdit, deleteBoard]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="text-white rounded-full p-2 duration-200 hover:bg-white/20">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </PopoverTemplate>
    </>
  );
};
