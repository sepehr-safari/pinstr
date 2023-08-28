import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';

import { PopoverItem, PopoverTemplate } from '@/components/Popovers';
import { PinSlideover } from '@/components/Slideovers';
import { useMutatePin } from '@/mutations';
import { Board } from '@/types';
import { joinClassNames } from '@/utils';

export const EditPinPopover = ({
  board,
  pinIndex,
  overlay = true,
  onClose,
}: {
  board: Board;
  pinIndex: number;
  overlay?: boolean;
  onClose?: () => void;
}) => {
  const [openPinEdit, setOpenPinEdit] = useState(false);

  const { removePin } = useMutatePin({
    initialBoard: board,
    initialPinIndex: pinIndex,
    onClose,
  });

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'Edit Pin',
        onClick: () => setOpenPinEdit(true),
      },
      {
        title: 'Remove Pin',
        color: 'text-red-600',
        onClick: () => {
          removePin.mutate();
        },
      },
    ],
    [setOpenPinEdit, removePin, pinIndex]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div
          className={joinClassNames(
            'rounded-full p-2 duration-200',
            overlay
              ? 'text-white hover:bg-white/20'
              : 'text-gray-900 hover:bg-gray-200'
          )}
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </div>
      </PopoverTemplate>

      <PinSlideover
        open={openPinEdit}
        onClose={() => setOpenPinEdit(false)}
        initialBoard={board}
        initialPinIndex={pinIndex}
      />
    </>
  );
};
