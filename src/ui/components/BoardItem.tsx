import { Transition } from '@headlessui/react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { nip19 } from 'nostr-tools';
import { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useCreatePinParams, useFiltersParams } from '@/logic/hooks';
import { useAuthor, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { ellipsis, loader } from '@/logic/utils';

import { AuthorOverview } from '@/ui/components';
import { EllipsisPopover } from '@/ui/components/Popovers';
import { BoardLikeButton, BoardZapButton } from '@/ui/components/ReactionButtons';

const BoardItem = ({ board, hideAuthor = false }: { board: Board; hideAuthor?: boolean }) => {
  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  const { data: author } = useAuthor(board.author);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const location = useLocation();

  const { setCreatePinParams } = useCreatePinParams(board);
  const { format, category } = useFiltersParams();

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
            actionButtons={[
              { title: 'Add Pin', icon: PaperClipIcon, onClick: setCreatePinParams, private: true },
            ]}
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
              <button
                onClick={() => format.set(board.format)}
                className="inline-flex items-center rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white hover:bg-black/50 hover:text-gray-100"
              >
                {board.format}
              </button>
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
              <button
                onClick={() => category.set(board.category)}
                className="inline-flex items-center rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white hover:bg-black/50 hover:text-gray-100"
              >
                {board.category}
              </button>
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
            <h3 className="text-sm font-semibold text-gray-900 [overflow-wrap:anywhere] hover:underline">
              {ellipsis(board.title, 60)}
            </h3>

            {!hideAuthor && <AuthorOverview author={author} />}
          </div>
          <div className="ml-4 mt-[2px] flex items-start gap-4">
            <BoardLikeButton board={board} />
            <BoardZapButton board={board} />
          </div>
        </div>
      </div>
    </>
  );
};

export const MemoizedBoardItem = memo(BoardItem, (prev, next) => prev.board.id == next.board.id);
