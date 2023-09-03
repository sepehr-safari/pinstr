import { Transition } from '@headlessui/react';
import { BoltIcon, HeartIcon } from '@heroicons/react/20/solid';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { nip19 } from 'nostr-tools';
import { memo, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useCreatePinParams } from '@/logic/hooks';
import { useMutateBoardLike } from '@/logic/mutations';
import { useAuthor, useBoardReactions, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { AuthorOverview } from '@/ui/components';
import { EllipsisPopover } from '@/ui/components/Popovers';

const BoardItem = ({ board, hideAuthor = false }: { board: Board; hideAuthor?: boolean }) => {
  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  const { data: author } = useAuthor(board.author);
  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const likedByUser = useMemo(
    () => !!reactions?.likes.find((event) => event.pubkey == pubkey),
    [reactions?.likes, pubkey]
  );
  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  const location = useLocation();

  const { setCreatePinParams } = useCreatePinParams(board);

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="relative aspect-w-5 aspect-h-4 overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer">
          <EllipsisPopover
            board={board}
            pinIndex={0}
            selfBoard={selfBoard}
            actionButtons={[{ title: 'Add Pin', icon: PaperClipIcon, onClick: setCreatePinParams }]}
            editType="board"
            buttonTheme="dark"
            className="top-3 right-3"
          />

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
            <Link
              to={`/p/${nip19.npubEncode(board.author)}/${board.title}`}
              state={{ backgroundLocation: location }}
            >
              <Transition.Child
                as="div"
                className="z-[1] absolute inset-0 bg-black/20"
                enter="duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-100"
                leaveFrom="opacity-100"
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
            <h3 className="text-sm font-semibold text-gray-900 hover:underline">{board.title}</h3>

            {!hideAuthor && author && <AuthorOverview author={author} />}
          </div>
          <div className="ml-4 mt-[2px] flex">
            <button
              type="button"
              onClick={() => !likedByUser && like()}
              className={joinClassNames(
                'inline-flex justify-center text-xs font-semibold',
                likedByUser
                  ? 'text-red-600 hover:cursor-default'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <HeartIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">
                {reactions && reactions.likes.length > 0 ? reactions.likes.length : 0}
              </span>
            </button>
            <button
              type="button"
              // onClick={() => zap()}
              className={joinClassNames(
                'ml-4 inline-flex justify-center text-xs font-semibold',
                zapedByUser
                  ? 'text-yellow-600 hover:text-yellow-700'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <BoltIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">
                {reactions && reactions.zaps.length > 0 ? reactions.zaps.length : 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const MemoizedBoardItem = memo(BoardItem, (prev, next) => prev.board.id == next.board.id);
