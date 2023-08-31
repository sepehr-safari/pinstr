import { useState } from 'react';
import ReactPlayer from 'react-player';

import { Board } from '@/logic/types';

import { DetailsSlideover } from '@/ui/components/Slideovers';

export const VideoGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((videoPin, index) => (
          <li
            key={index}
            className="p-2 group relative rounded-lg hover:bg-gray-50 ease-in-out duration-500 hover:shadow-lg"
          >
            <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-md bg-black">
              <ReactPlayer url={videoPin[0]} width="100%" height="100%" controls />
            </div>

            <p className="mt-4 block truncate text-sm font-medium text-gray-900 ease-in-out duration-700">
              {videoPin[1]}
            </p>

            <div className="w-full ">
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
            className="aspect-w-10 aspect-h-7 overflow-hidden rounded-md bg-black"
          >
            <ReactPlayer url={board.pins[pinIndex][0]} width="100%" height="100%" controls />
          </div>
        )}
      </DetailsSlideover>
    </>
  );
};
