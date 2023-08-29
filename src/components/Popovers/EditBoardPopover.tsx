import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { PopoverItem, PopoverTemplate } from '@/components/Popovers';
import { useMutateBoard } from '@/mutations';
import { useLocalStore } from '@/store';
import { Board } from '@/types';

export const EditBoardPopover = ({ board }: { board: Board }) => {
  const { deleteBoard } = useMutateBoard();

  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'Edit Board',
        onClick: () => {
          setBoard(board);
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'edit-board');
              return searchParams;
            },
            { replace: true }
          );
        },
      },
      {
        title: 'Add a Pin to this Board',
        onClick: () => {
          if (board) {
            setBoard(board);
            setSearchParams(
              (searchParams) => {
                searchParams.set('action', 'create-pin');
                searchParams.set('i', board.pins.length.toString());
                return searchParams;
              },
              { replace: true }
            );
          }
        },
      },
      {
        title: 'Remove Board',
        color: 'text-red-600',
        onClick: () => {
          setBoard(board);
          deleteBoard.mutate();
        },
      },
    ],
    [deleteBoard, setBoard, setSearchParams]
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
