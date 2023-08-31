import { useState } from 'react';
import ReactPlayer from 'react-player';

import { Board } from '@/logic/types';

import { PinContextMenu } from '@/ui/components';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const VideoGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);
  const [playingIndex, setPlayingIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((videoPin, index) => (
          <li key={index} className="group relative overflow-hidden rounded-lg">
            <PinContextMenu
              onClick={() => setPlayingIndex((prev) => (prev != index ? index : -1))}
              onView={() => setPinIndex(index)}
              href={videoPin[0]}
            />

            <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-md bg-black">
              <ReactPlayer
                url={videoPin[0]}
                width="100%"
                height="100%"
                controls
                playing={playingIndex == index}
              />
            </div>

            <p className="mt-4 block truncate text-sm font-medium text-gray-900 duration-700">
              {videoPin[1]}
            </p>
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
