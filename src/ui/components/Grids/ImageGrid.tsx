import { useState } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';

export const ImageGrid = ({
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
          'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6'
        )}
      >
        {board.pins.slice(0, lastPinIndex).map((imagePin, index) => (
          <li key={imagePin[0]} className="group relative overflow-hidden rounded-md">
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
              <p className="w-full p-2 pt-6 truncate text-start text-xs font-medium text-white md:text-sm bg-gradient-to-t from-black/60 to-transparent">
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
