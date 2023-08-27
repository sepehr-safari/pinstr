import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { Board } from '@/types';
import { loader } from '@/utils';

export const ImageGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((imagePin, index) => (
          <li
            key={index}
            className="p-2 group relative rounded-xl hover:bg-gray-50 ease-in-out duration-500 hover:shadow-md"
          >
            <div className="ease-in-out duration-700">
              <div className="aspect-w-5 aspect-h-4 block overflow-hidden rounded-md bg-gray-200 text-gray-200">
                <a href={imagePin[0]} target="_blank" rel="noreferrer">
                  <img
                    src={loader(imagePin[0], { w: 500, h: 400 })}
                    alt={imagePin[1]}
                    className="hover:opacity-75 hover:cursor-zoom-in"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            <p className="mt-4 block truncate text-sm font-medium text-gray-900 ease-in-out duration-700">
              {imagePin[1]}
            </p>

            <div className="w-full">
              <button
                type="button"
                className="mt-4 w-full text-xs text-gray-700 font-medium px-4 py-2 bg-gray-200 rounded-md ease-in-out duration-500 opacity-0 translate-y-2 hover:bg-gray-300 hover:text-gray-900 group-hover:opacity-100 group-hover:translate-y-0"
                onClick={() => setPinIndex(index)}
              >
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        onClose={() => setPinIndex(-1)}
        onPrevious={() =>
          setPinIndex((pinIndex) => (pinIndex > -1 ? pinIndex - 1 : -1))
        }
        onNext={() =>
          setPinIndex((pinIndex) =>
            pinIndex > -1 && pinIndex < board.pins.length - 1
              ? pinIndex + 1
              : -1
          )
        }
      >
        {pinIndex > -1 && (
          <div className="w-full max-w-sm mx-auto">
            <div className="aspect-w-5 aspect-h-4 block w-full overflow-hidden rounded-md bg-gray-200 text-gray-200">
              <a
                href={board.pins[pinIndex][0]}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={loader(board.pins[pinIndex][0], { w: 500, h: 400 })}
                  alt={board.pins[pinIndex][1]}
                  className="hover:opacity-75 hover:cursor-zoom-in"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        )}
      </DetailsSlideover>
    </>
  );
};
