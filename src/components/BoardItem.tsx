import { Transition } from '@headlessui/react';
import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthorOverview } from '@/components';
import { useMutateBoardLike } from '@/mutations';
import { useAuthor, useBoardReactions, useUser } from '@/queries';
import { Board } from '@/types';
import { loader } from '@/utils';
import { EditBoardPopover } from './Popovers';

export const BoardItem = ({
  board,
  hideAuthor = false,
}: {
  board: Board;
  hideAuthor?: boolean;
}) => {
  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  const { data: author } = useAuthor(board.author);
  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const location = useLocation();

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="relative aspect-w-5 aspect-h-4 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer">
          <Transition show={isHovering}>
            <Transition.Child
              as="div"
              className="z-[2] absolute left-4 top-4"
              enter="duration-200 delay-100"
              enterFrom="opacity-0 -translate-x-2"
              enterTo="opacity-100 translate-x-0"
              leave="duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-2"
            >
              <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-0.5 text-xs font-medium text-gray-900 hover:bg-gray-300">
                {board.type}
              </span>
            </Transition.Child>
            <Transition.Child
              as="div"
              className="z-[2] absolute right-4 bottom-4"
              enter="duration-200 delay-100"
              enterFrom="opacity-0 translate-x-2"
              enterTo="opacity-100 translate-x-0"
              leave="duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-2"
            >
              <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-0.5 text-xs font-medium text-gray-900 hover:bg-gray-300">
                {board.category}
              </span>
            </Transition.Child>
            {selfBoard && (
              <Transition.Child
                as="div"
                className="z-[2] absolute right-2 top-2"
                enter="duration-200"
                enterFrom="opacity-0 translate-x-2"
                enterTo="opacity-100 translate-x-0"
                leave="duration-200"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-2"
              >
                <EditBoardPopover board={board} />
              </Transition.Child>
            )}
            <Link
              to={`/p/${nip19.npubEncode(board.author)}/${board.title}`}
              state={{ backgroundLocation: location }}
            >
              <Transition.Child
                as="div"
                className="z-[1] absolute inset-0 bg-black"
                enter="duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="duration-100"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
              />
            </Link>
          </Transition>
          <img
            src={loader(board.image, { w: 500, h: 400 })}
            alt={board.title}
            className="h-full w-full text-gray-100"
            loading="lazy"
          />
        </div>

        <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 hover:underline">
              {board.title}
            </h3>

            {!hideAuthor && author && <AuthorOverview author={author} />}
          </div>
          <div className="ml-4 mt-[2px] flex">
            <button
              className="flex text-xs font-bold text-gray-500 hover:text-gray-700"
              onClick={() => like()}
            >
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
