import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { loader } from '@/logic/utils';

import { EllipsisPopover } from '@/ui/components/Popovers';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const LinkGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  return (
    <>
      {(board.pins || []).map((linkPin, index) => (
        <li
          key={index}
          className="group relative overflow-hidden rounded-lg bg-white shadow ease-in-out duration-200 hover:shadow-md"
        >
          <EllipsisPopover board={board} selfBoard={selfBoard} pinIndex={index} editType="pin" />

          <button
            type="button"
            onClick={() => setPinIndex(index)}
            className="group/top flex w-full items-stretch border-b hover:bg-gray-50"
          >
            <img
              className="h-24 w-24 flex-shrink-0 bg-gray-200 text-gray-200 duration-300 group-hover/top:opacity-70"
              src={loader(linkPin[2], { w: 96, h: 96 })}
              alt={linkPin[1]}
              loading="lazy"
            />
            <div className="flex items-center pl-4 pr-12 truncate group-hover/top:underline">
              <h3 className="truncate text-sm font-medium text-gray-900">{linkPin[1]}</h3>
              <div>
                <ArrowRightIcon className="ml-1 w-4 h-4 duration-300 -translate-x-1 opacity-0 group-hover/top:opacity-100 group-hover/top:translate-x-0" />
              </div>
            </div>
          </button>
          <div className="p-6 relative">
            <div className="absolute inset-0 flex items-center px-4">
              <a
                className="z-[4] truncate text-xs font-light text-blue-700 hover:underline hover:text-blue-900"
                href={linkPin[0]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkPin[0]}
              </a>
            </div>
          </div>
        </li>
      ))}

      <DetailsSlideover board={board} pinIndex={pinIndex} setPinIndex={setPinIndex}>
        {pinIndex > -1 && (
          <>
            <a
              key={pinIndex}
              href={board.pins[pinIndex][2]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-96 h-auto aspect-1 bg-gray-200 text-gray-200 hover:cursor-zoom-in hover:opacity-80"
            >
              <img
                className="w-full h-full"
                src={loader(board.pins[pinIndex][2], { w: 400, h: 400 })}
                alt={board.pins[pinIndex][1]}
                loading="lazy"
              />
            </a>
            <div className="p-4">
              <a
                href={board.pins[pinIndex][0]}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link"
              >
                <div className="text-sm font-medium text-gray-900">{board.pins[pinIndex][1]}</div>
                <div className="mt-2 text-xs font-light text-blue-700 group-hover/link:underline group-hover/link:text-blue-900">
                  {board.pins[pinIndex][0]}
                </div>
              </a>
            </div>
          </>
        )}
      </DetailsSlideover>
    </>
  );
};
