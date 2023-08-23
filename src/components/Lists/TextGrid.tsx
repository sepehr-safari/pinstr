import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { Board } from '@/types';

export const TextGrid = ({ board }: { board: Board }) => {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((textPin, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-200 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setShownDetailsIndex(index)}
              className="flex w-full items-center group hover:cursor-pointer"
            >
              <img
                className="h-20 w-20 flex-shrink-0 rounded-ss-md object-cover object-center bg-gray-200 text-gray-200"
                src={textPin[2]}
                alt={textPin[1]}
              />
              <div className="flex-1 truncate px-4">
                <div className="truncate flex items-center translate-y-3 ease-in-out duration-500 group-hover:translate-y-0">
                  <h3 className="leading-10 truncate text-sm font-medium text-gray-900">
                    {textPin[1]}
                  </h3>
                </div>
                <div className="w-full flex justify-end">
                  <div className="inline-flex items-center translate-x-2 opacity-0 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-xs font-light text-gray-500">
                      View Details
                    </span>
                    <ChevronRightIcon className="ml-1 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </button>
            <div className="p-4 ">
              <div className="truncate text-xs font-light text-blue-700 hover:underline hover:text-blue-900">
                {textPin[0]}
              </div>
            </div>

            <DetailsSlideover
              isShown={shownDetailsIndex === index}
              onClose={() => setShownDetailsIndex(-1)}
              onNext={() =>
                setShownDetailsIndex((currentIndex) =>
                  board.pins.length > currentIndex + 1
                    ? currentIndex + 1
                    : currentIndex
                )
              }
              onPrevious={() =>
                setShownDetailsIndex((currentIndex) =>
                  currentIndex > 0 ? currentIndex - 1 : currentIndex
                )
              }
              pin={textPin}
              headers={board.headers}
            >
              <div className="max-w-sm mx-auto">
                <div className="rounded-lg shadow-md bg-white">
                  <img
                    className="w-full object-cover object-center aspect-1 rounded-t-lg bg-gray-200 text-gray-200"
                    src={textPin[2]}
                    alt={textPin[1]}
                  />
                  <div className="p-4">
                    <div className="truncate text-xs font-light text-blue-700 hover:underline hover:text-blue-900">
                      {textPin[0]}
                    </div>
                  </div>
                </div>
              </div>
            </DetailsSlideover>
          </li>
        ))}
      </ul>
    </>
  );
};
