import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { ellipsis, joinClassNames, loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';

export const TextGrid = ({
  board,
  setPinIndex,
}: {
  board: Board;
  setPinIndex: (index: number) => void;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const [lastPinIndex, setLastPinIndex] = useState<number>(10);
  const hasNextPage = board.pins.length > lastPinIndex;

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-4'
        )}
      >
        {board.pins.slice(0, lastPinIndex).map((textPin, index) => (
          <li
            key={textPin[0]}
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
                src={loader(textPin[2], { w: 96, h: 96 })}
                alt={textPin[1]}
                loading="lazy"
              />
              <div className="flex items-center pl-4 pr-12 truncate group-hover/top:underline">
                <h3 className="truncate text-sm font-medium text-gray-900">{textPin[1]}</h3>
                <div>
                  <ArrowRightIcon className="ml-1 w-4 h-4 duration-300 -translate-x-1 opacity-0 group-hover/top:opacity-100 group-hover/top:translate-x-0" />
                </div>
              </div>
            </button>
            <div className="p-4 flex flex-grow items-center">
              <div className="text-xs font-light">{ellipsis(textPin[0], 120)}</div>
            </div>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className="mt-16 mx-auto block text-gray-700 bg-gray-200 text-xs px-10 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
          onClick={() => setLastPinIndex((index) => index + 10)}
        >
          Show More
        </button>
      )}
    </>
  );
};
