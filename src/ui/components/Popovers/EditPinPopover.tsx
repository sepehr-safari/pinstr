import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateBoard } from '@/logic/mutations';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';
import { joinClassNames } from '@/logic/utils';

import { PopoverItem, PopoverTemplate } from '@/ui/components/Popovers';

export const EditPinPopover = ({
  board,
  pinIndex,
  overlay = true,
  onClose,
}: {
  board: Board;
  pinIndex: number;
  overlay?: boolean;
  onClose: () => void;
}) => {
  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  const { removePin } = useMutateBoard();

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'Edit Pin',
        onClick: () => {
          onClose();
          setBoard(board);
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'edit-pin');
              searchParams.set('i', pinIndex.toString());
              return searchParams;
            },
            { replace: true }
          );
        },
      },
      {
        title: 'Remove Pin',
        color: 'text-red-600',
        onClick: () => {
          onClose();
          setBoard(board);
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'remove-pin');
              searchParams.set('i', pinIndex.toString());
              return searchParams;
            },
            { replace: true }
          );
        },
      },
    ],
    [onClose, pinIndex, setBoard, setSearchParams, removePin, board]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div
          className={joinClassNames(
            'rounded-full p-2 duration-200',
            overlay ? 'text-white hover:bg-white/20' : 'text-gray-900 hover:bg-gray-200'
          )}
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </PopoverTemplate>
    </>
  );
};
