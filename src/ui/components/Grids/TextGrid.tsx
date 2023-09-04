import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const TextGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5'
        )}
      >
        {(board.pins || []).map((textPin, index) => (
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
              <div className="text-xs font-light">
                {textPin[0].length < 120 ? textPin[0] : textPin[0].slice(0, 120) + '...'}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <DetailsSlideover board={board} pinIndex={pinIndex} setPinIndex={setPinIndex}>
        {pinIndex > -1 && (
          <>
            <a
              key={pinIndex}
              href={board.pins[pinIndex][2]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-96 h-auto aspect-1 rounded-t-lg bg-gray-200 text-gray-200 hover:cursor-zoom-in hover:opacity-80"
            >
              <img
                className="w-full h-full"
                src={loader(board.pins[pinIndex][2], { w: 400, h: 400 })}
                alt={board.pins[pinIndex][1]}
                loading="lazy"
              />
            </a>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">{board.pins[pinIndex][1]}</h3>
              <div className="mt-2 text-xs font-light">{board.pins[pinIndex][0]}</div>
            </div>
          </>
        )}
      </DetailsSlideover>
    </>
  );
};
