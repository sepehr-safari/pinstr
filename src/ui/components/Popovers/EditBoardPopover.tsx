import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateBoard } from '@/logic/mutations';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';

import { PopoverItem, PopoverTemplate } from '@/ui/components/Popovers';

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
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'remove-board');
              return searchParams;
            },
            { replace: true }
          );
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
