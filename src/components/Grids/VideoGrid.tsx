import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { Board } from '@/types';

export const VideoGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((videoPin, index) => (
          <li
            key={index}
            className="p-2 group relative rounded-lg hover:bg-gray-50 ease-in-out duration-500 hover:shadow-md"
          >
            <div className="ease-in-out duration-700">
              <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-200">
                {true ? ( // TODO
                  <iframe className="object-cover" src={videoPin[0]} />
                ) : (
                  <video
                    controls
                    autoPlay={false}
                    preload="off"
                    className="object-cover"
                    src={videoPin[0]}
                  />
                )}
              </div>
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
          <div
            key={pinIndex}
            className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-100"
          >
            {true ? ( // TODO
              <iframe className="object-cover" src={board.pins[pinIndex][0]} />
            ) : (
              <video
                controls
                autoPlay={false}
                preload="off"
                className="object-cover"
                src={board.pins[pinIndex][0]}
              />
            )}
          </div>
        )}
      </DetailsSlideover>
    </>
  );
};
