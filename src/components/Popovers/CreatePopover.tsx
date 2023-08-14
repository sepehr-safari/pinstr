import { PlusIcon } from '@heroicons/react/20/solid';

import { CreateSlideover } from '@/components';
import { PopoverTemplate } from '@/components/Popovers';
import { PopoverItem } from './PopoverTemplate.types';
import { useState } from 'react';

const items: PopoverItem[] = [
  {
    name: 'New Board',
    description: 'Create a new board',
    onClick: () => {},
  },
  {
    name: 'Add Pin',
    description: 'Add a new pin to an existing board',
    onClick: () => {},
  },
];

export default function CreatePopover() {
  const [openBoard, setOpenBoard] = useState(false);
  const [openPin, setOpenPin] = useState(false);

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" aria-hidden="true" />
          Create
        </div>
      </PopoverTemplate>

      <CreateSlideover open={openBoard} setOpen={setOpenBoard} />
    </>
  );
}
