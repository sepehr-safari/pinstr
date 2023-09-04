import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ReactPlayer from 'react-player';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const VideoGrid = ({ board }: { board: Board }) => {
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
        {(board.pins || []).map((videoPin, index) => (
          <li key={index} className="group relative overflow-hidden rounded-lg">
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

            <div className="aspect-w-5 aspect-h-3 overflow-hidden rounded-md bg-black">
              <ReactPlayer url={videoPin[0]} width="100%" height="100%" controls />
            </div>

            <p className="mt-4 mb-2 mr-14 block truncate text-sm font-medium text-gray-900 duration-700">
              {videoPin[1]}
            </p>
          </li>
        ))}
      </ul>

      <DetailsSlideover board={board} pinIndex={pinIndex} setPinIndex={setPinIndex}>
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
