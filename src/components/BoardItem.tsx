import { Transition } from '@headlessui/react';
import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthorOverview } from '@/components';
import { useAuthor, useBoardReactions } from '@/queries';
import { Board } from '@/types';

export const BoardItem = ({
  board,
  hideAuthor = false,
}: {
  board: Board;
  hideAuthor?: boolean;
}) => {
  const { data: author } = useAuthor(board.author);
  const { data: reactions } = useBoardReactions(board);

  const location = useLocation();

  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Link
          to={`/p/${nip19.npubEncode(board.author)}/${board.title}`}
          state={{ backgroundLocation: location }}
        >
          <div className="relative aspect-w-5 aspect-h-4 w-full overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer">
            <Transition show={isHovering}>
              <Transition.Child
                as="div"
                className="z-[2] absolute left-4 top-4"
                enter="transition opacity transform duration-300"
                enterFrom="opacity-0 translate-x-1"
                enterTo="opacity-100 translate-x-0"
                leave="transition opacity transform duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-1"
              >
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-300">
                  {board.type}
                </span>
              </Transition.Child>
              <Transition.Child
                as="div"
                className="z-[2] absolute right-4 bottom-4"
                enter="transition opacity transform duration-300"
                enterFrom="opacity-0 -translate-x-1"
                enterTo="opacity-100 translate-x-0"
                leave="transition opacity transform duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-1"
              >
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-300">
                  {board.category}
                </span>
              </Transition.Child>
              <Transition.Child
                as="div"
                className="z-[1] absolute inset-0 bg-black"
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-30"
                leave="transition-opacity duration-100"
                leaveFrom="opacity-30"
                leaveTo="opacity-0"
              />
            </Transition>
            <img
              src={board.image}
              alt={board.title}
              className="h-full w-full object-cover object-center text-gray-100"
            />
          </div>
        </Link>
        <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 hover:underline">
              {board.title}
            </h3>

            {!hideAuthor && author && <AuthorOverview author={author} />}
          </div>
          <div className="ml-4 mt-[2px] flex">
            <button className="flex text-xs font-bold text-gray-500 hover:text-gray-700">
              <HandThumbUpIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">
                {reactions && reactions.likes.length > 0
                  ? reactions.likes.length
                  : 0}
              </span>
            </button>
            <button className="ml-4 flex text-xs font-bold text-gray-500 hover:text-gray-700">
              <BoltIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">
                {reactions && reactions.zaps.length > 0
                  ? reactions.zaps.length
                  : 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
