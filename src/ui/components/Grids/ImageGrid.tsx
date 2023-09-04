import { useState } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';
import { DetailsSlideover } from '@/ui/components/Slideovers';
import { useCommentsParams } from '@/logic/hooks';

export const ImageGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const { commentsParam } = useCommentsParams();

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          commentsParam == null
            ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5'
            : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-3 5xl:grid-cols-4'
        )}
      >
        {(board.pins || []).map((imagePin, index) => (
          <li
            key={index}
            className="group aspect-w-5 aspect-h-4 relative block overflow-hidden rounded-md"
          >
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              externalLinks={[[imagePin[0], 'Open Image']]}
              editType="pin"
              buttonTheme="dark"
            />

            <button
              type="button"
              className="z-[3] absolute inset-0 flex items-end"
              onClick={() => setPinIndex(index)}
            >
              <p className="w-full p-2 pt-6 block truncate text-start text-xs font-medium text-white md:text-sm bg-gradient-to-t from-black/60 to-transparent">
                {imagePin[1]}
              </p>
            </button>

            <div className="absolute z-[2] inset-0 hidden bg-black/20 group-hover:block" />

            <img
              src={loader(imagePin[0], { w: 500, h: 400 })}
              alt={imagePin[1]}
              className="z-[1] bg-gray-200 text-gray-200"
              loading="lazy"
            />
          </li>
        ))}
      </ul>

      <DetailsSlideover board={board} pinIndex={pinIndex} setPinIndex={setPinIndex}>
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
