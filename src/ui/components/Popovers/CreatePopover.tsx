import { ListBulletIcon, PaperClipIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';

import { PopoverItem, PopoverTemplate } from '@/ui/components/Popovers';

export const CreatePopover = () => {
  const [_, setSearchParams] = useSearchParams();
  const setBoard = useLocalStore((store) => store.setBoard);

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
        icon: ListBulletIcon,
        onClick: () => {
          setBoard({});
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'create-board');
              return searchParams;
            },
            { replace: true }
          );
        },
      },
      {
        title: 'Add Pin',
        description: 'Add a new pin to an existing board',
        icon: PaperClipIcon,
        onClick: () => {
          setBoard({});
          setSearchParams(
            (searchParams) => {
              searchParams.set('action', 'create-pin');
              return searchParams;
            },
            { replace: true }
          );
        },
      },
    ],
    [setSearchParams, setBoard]
  );

  return (
    <>
      <PopoverTemplate items={items}>
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
          Create
        </div>
      </PopoverTemplate>
    </>
  );
};
