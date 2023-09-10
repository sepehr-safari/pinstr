import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';

export const LinkGrid = ({
  board,
  setPinIndex,
}: {
  board: Board;
  setPinIndex: (index: number) => void;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-4'
        )}
      >
        {(board.pins || []).map((linkPin, index) => (
          <li
            key={index}
            className="group relative overflow-hidden flex flex-col justify-between rounded-lg bg-white shadow duration-200 hover:shadow-md"
          >
            <EllipsisPopover board={board} selfBoard={selfBoard} pinIndex={index} editType="pin" />

            <button
              type="button"
              onClick={() => setPinIndex(index)}
              className="group/top flex w-full items-stretch border-b hover:bg-gray-50"
            >
              <img
                className="h-24 w-24 flex-shrink-0 bg-gray-200 text-gray-200 duration-300 group-hover/top:opacity-70"
                src={loader(linkPin[2], { w: 96, h: 96 })}
                alt={linkPin[1]}
                loading="lazy"
              />
              <div className="flex items-center pl-4 pr-12 truncate group-hover/top:underline">
                <h3 className="truncate text-sm font-medium text-gray-900">{linkPin[1]}</h3>
                <div>
                  <ArrowRightIcon className="ml-1 w-4 h-4 duration-300 -translate-x-1 opacity-0 group-hover/top:opacity-100 group-hover/top:translate-x-0" />
                </div>
              </div>
            </button>
            <div className="p-6 relative">
              <div className="absolute inset-0 flex items-center px-4">
                <a
                  className="z-[4] truncate text-xs font-light text-blue-700 hover:underline hover:text-blue-900"
                  href={linkPin[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {linkPin[0]}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
