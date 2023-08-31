import { useState } from 'react';

import { Board } from '@/logic/types';
import { loader } from '@/logic/utils';

import { DetailsSlideover } from '@/ui/components/Slideovers';

export const ImageGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((imagePin, index) => (
          <li
            key={index}
            className="group aspect-w-5 aspect-h-4 relative block overflow-hidden rounded-md bg-gray-200 text-gray-200"
          >
            <div className="absolute inset-0 flex flex-col justify-end z-[3]">
              <div className="flex-grow flex justify-center items-center bg-black/60 opacity-0 duration-200 group-hover:opacity-100">
                <div className="w-3/4">
                  <button
                    type="button"
                    className="w-full text-xs text-gray-900 font-medium py-1 bg-white/60 rounded-md hover:bg-white/90 md:py-2"
                    onClick={() => setPinIndex(index)}
                  >
                    View Details
                  </button>

                  <a
                    href={imagePin[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 w-full inline-block text-center text-xs text-gray-900 font-medium py-1 bg-white/60 rounded-md hover:bg-white/90 md:py-2"
                  >
                    Open
                  </a>
                </div>
              </div>
            </div>

            <div className="z-[2] absolute inset-0 flex flex-col justify-end">
              <p className="p-2 pt-6 block truncate text-xs font-medium text-white md:text-sm bg-gradient-to-t from-black/60 to-transparent">
                {imagePin[1]}
              </p>
            </div>

            <img
              src={loader(imagePin[0], { w: 500, h: 400 })}
              alt={imagePin[1]}
              className="z-[1]"
              loading="lazy"
            />
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
          <div
            key={pinIndex}
            className="aspect-w-5 aspect-h-4 block w-full overflow-hidden rounded-md bg-gray-200 text-gray-200"
          >
            <a href={board.pins[pinIndex][0]} target="_blank" rel="noreferrer">
              <img
                src={loader(board.pins[pinIndex][0], { w: 500, h: 400 })}
                alt={board.pins[pinIndex][1]}
                className="hover:opacity-75 hover:cursor-zoom-in"
                loading="lazy"
              />
            </a>
          </div>
        )}
      </DetailsSlideover>
    </>
  );
};
