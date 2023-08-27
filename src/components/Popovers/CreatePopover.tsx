import { PlusIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';

import { BoardSlideover, PinSlideover } from '@/components';
import { PopoverItem, PopoverTemplate } from '@/components/Popovers';

export const CreatePopover = () => {
  const [openBoard, setOpenBoard] = useState(false);
  const [openPin, setOpenPin] = useState(false);

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
        onClick: () => setOpenBoard(true),
      },
      {
        title: 'Add Pin',
        description: 'Add a new pin to an existing board',
        onClick: () => setOpenPin(true),
      },
    ],
    [setOpenBoard, setOpenPin]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
          Create
        </div>
      </PopoverTemplate>

      <BoardSlideover open={openBoard} onClose={() => setOpenBoard(false)} />
      <PinSlideover
        open={openPin}
        onClose={() => setOpenPin(false)}
        initialPinIndex={-1}
      />
    </>
  );
};
