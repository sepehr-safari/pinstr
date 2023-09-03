import { Popover } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import { joinClassNames } from '@/logic/utils';

export const PopoverButton = ({
  className,
  slideInFrom,
}: {
  className: string;
  slideInFrom: 'right' | 'left';
}) => {
  return (
    <>
      <Popover.Button
        className={joinClassNames(
          slideInFrom == 'right' ? 'translate-x-2' : '-translate-x-2',
          'absolute z-[4] outline-none text-white rounded-full bg-black/30 p-2 duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hover:bg-black/50',
          className
        )}
      >
        <EllipsisVerticalIcon className="h-6 w-6" />
      </Popover.Button>
    </>
  );
};
