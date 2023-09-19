import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';

export const VideoGrid = ({
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
        {board.pins.slice(0, lastPinIndex).map((videoPin, index) => (
          <li key={videoPin[0]} className="group relative overflow-hidden rounded-lg">
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              actionButtons={[
                {
                  title: 'View Details',
                  icon: DocumentTextIcon,
                  onClick: () => setPinIndex(index),
                },
              ]}
              externalLinks={[[videoPin[0], 'Open Video']]}
              editType="pin"
              className="right-0 bottom-0"
            />

            <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-black">
              <ReactPlayer url={videoPin[0]} width="100%" height="100%" controls />
            </div>

            <p className="mt-4 mb-2 mr-14 block truncate text-sm font-medium text-gray-900 duration-700">
              {videoPin[1]}
            </p>
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
