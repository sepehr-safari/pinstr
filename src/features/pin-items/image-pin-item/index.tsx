import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { useUser } from '@/shared/hooks/queries';
import { Board } from '@/shared/types';
import { loader } from '@/shared/utils';

import { EllipsisPopover } from '@/features';

type Props = {
  board: Board;
  setPinIndex: (index: number) => void;
};

export const ImagePinItem = ({ board, setPinIndex }: Props) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.event.author.pubkey : false;

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 600: 2, 900: 3, 1200: 4, 1500: 5, 1900: 6, 2200: 7 }}
      >
        <Masonry gutter="0.25rem">
          {board.pins.map((imagePin, index) => (
            <div key={imagePin[0]} className="group relative overflow-hidden rounded-md">
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
                src={loader(imagePin[0], { w: 600 })}
                alt={imagePin[1]}
                className="z-[1] bg-gray-200 text-gray-200"
                loading="lazy"
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 5xl:grid-cols-6'
        )}
      >
        {board.pins.map((imagePin, index) => (
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
      </ul> */}
    </>
  );
};
