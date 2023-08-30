import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components/Slideovers';
import { Board } from '@/types';
import { loader } from '@/utils';

export const TextGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((textPin, index) => (
          <li
            key={index}
            className="flex flex-col justify-between divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-200 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setPinIndex(index)}
              className="flex w-full items-center group hover:cursor-pointer"
            >
              <img
                className="h-24 w-24 flex-shrink-0 rounded-ss-md bg-gray-200 text-gray-200"
                src={loader(textPin[2], { w: 96, h: 96 })}
                alt={textPin[1]}
                loading="lazy"
              />
              <div className="flex-1 truncate px-4">
                <div className="truncate flex items-center translate-y-3 ease-in-out duration-500 group-hover:translate-y-0">
                  <h3 className="leading-10 truncate text-sm font-medium text-gray-900">
                    {textPin[1]}
                  </h3>
                </div>
                <div className="w-full flex justify-end">
                  <div className="inline-flex items-center translate-x-2 opacity-0 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-xs font-light text-gray-500">View Details</span>
                    <ChevronRightIcon className="ml-1 h-5 w-5 text-gray-400" />
                  </div>
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

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        onClose={() => setPinIndex(-1)}
        onPrevious={() => setPinIndex((pinIndex) => (pinIndex > -1 ? pinIndex - 1 : -1))}
        onNext={() =>
          setPinIndex((pinIndex) =>
            pinIndex > -1 && pinIndex < board.pins.length - 1 ? pinIndex + 1 : -1
          )
        }
      >
        {pinIndex > -1 && (
          <>
            <a
              key={pinIndex}
              href={board.pins[pinIndex][2]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="w-96 h-96 aspect-1 rounded-t-lg bg-gray-200 text-gray-200 hover:cursor-zoom-in hover:opacity-80"
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
