import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { Board } from '@/logic/types';
import { loader } from '@/logic/utils';

import { DetailsSlideover } from '@/ui/components/Slideovers';

export const LinkGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((linkPin, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-200 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setPinIndex(index)}
              className="flex w-full items-center group hover:cursor-pointer"
            >
              <img
                className="h-24 w-24 flex-shrink-0 rounded-ss-md bg-gray-200 text-gray-200"
                src={loader(linkPin[2], { w: 96, h: 96 })}
                alt={linkPin[1]}
                loading="lazy"
              />
              <div className="flex-1 truncate px-4">
                <div className="truncate flex items-center translate-y-3 ease-in-out duration-500 group-hover:translate-y-0">
                  <h3 className="leading-10 truncate text-sm font-medium text-gray-900">
                    {linkPin[1]}
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
            <div className="p-4 ">
              <a href={linkPin[0]} target="_blank" rel="noopener noreferrer">
                <div className="truncate text-xs font-light text-blue-700 hover:underline hover:text-blue-900">
                  {linkPin[0]}
                </div>
              </a>
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
              <a
                href={board.pins[pinIndex][0]}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="text-sm font-medium text-gray-900">{board.pins[pinIndex][1]}</div>
                <div className="mt-2 text-xs font-light text-blue-700 group-hover:underline group-hover:text-blue-900">
                  {board.pins[pinIndex][0]}
                </div>
              </a>
            </div>
          </>
        )}
      </DetailsSlideover>
    </>
  );
};
