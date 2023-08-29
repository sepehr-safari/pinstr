import { PlusIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { PopoverItem, PopoverTemplate } from '@/components/Popovers';
import { useLocalStore } from '@/store';

export const CreatePopover = () => {
  const [_, setSearchParams] = useSearchParams();
  const setBoard = useLocalStore((store) => store.setBoard);

  const items: PopoverItem[] = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
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
