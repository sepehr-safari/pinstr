import { ListBulletIcon, PaperClipIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import { useCreateBoardParams, useCreatePinParams } from '@/logic/hooks';
import { PopoverButton } from '@/logic/types';

import { PopoverTemplate } from './';

export const CreatePopover = () => {
  const { setCreateBoardParams } = useCreateBoardParams();
  const { setCreatePinParams } = useCreatePinParams({});

  const buttons: PopoverButton[] = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
        icon: ListBulletIcon,
        onClick: setCreateBoardParams,
      },
      {
        title: 'Add Pin',
        description: 'Add a new pin to an existing board',
        icon: PaperClipIcon,
        onClick: setCreatePinParams,
      },
    ],
    [setCreateBoardParams, setCreatePinParams]
  );

  return (
    <>
      <PopoverTemplate buttons={buttons}>
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
          Create
        </div>
      </PopoverTemplate>
    </>
  );
};
