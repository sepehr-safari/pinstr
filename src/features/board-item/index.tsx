import { Transition } from '@headlessui/react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { useFiltersParams } from '@/shared/hooks/common';
import { useUser } from '@/shared/hooks/queries';

import { Board } from '@/shared/types';
import { ellipsis, loader } from '@/shared/utils';

import { EllipsisPopover } from '@/features';
import { BoardLikeButton, BoardZapButton } from '@/features/reaction-buttons';

// TODO: refactor
const BoardItem = ({ board, hideAuthor = false }: { board: Board; hideAuthor?: boolean }) => {
  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.event.author.pubkey : false;

  const navigate = useNavigate();
  const location = useLocation();

  // const { format, category } = useFiltersParams();

  return (
    <>
      <div
        className="group"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="relative overflow-hidden rounded-sm bg-gray-100 hover:cursor-pointer">
          <EllipsisPopover
            board={board}
            pinIndex={0}
            selfBoard={selfBoard}
            actionButtons={[
              {
                title: 'Add Pin',
                icon: PaperClipIcon,
                onClick: () =>
                  navigate(
                    `/p/${board.event.author.npub}/${encodeURIComponent(board.title)}/add-pin`
                  ),
                private: true,
              },
            ]}
            editType="board"
            buttonTheme="dark"
            className="top-3 left-3"
            slideInFrom="left"
          />

          <Transition show={isHovering}>
            {/* <Transition.Child
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
              className="z-[2] absolute right-4 top-4"
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
            </Transition.Child> */}
            <Transition.Child
              as="div"
              className="z-[2] absolute right-4 top-4"
              enter="duration-200 delay-100"
              enterFrom="opacity-0 translate-x-2"
              enterTo="opacity-100 translate-x-0"
              leave="duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-2"
            >
              <div className="flex gap-2">
                <BoardLikeButton board={board} circular />
                <BoardZapButton board={board} circular />
                {/* TODO: Slideover comments section from right */}
                {/* <BoardCommentButton board={board} circular /> */}
              </div>
            </Transition.Child>
            <Transition.Child
              as="div"
              className="z-[2] absolute left-4 bottom-4 right-4"
              enter="duration-200 delay-100"
              enterFrom="opacity-0 translate-x-0"
              enterTo="opacity-100 translate-x-2"
              leave="duration-200"
              leaveFrom="opacity-100 translate-x-2"
              leaveTo="opacity-0 translate-x-0"
            >
              {/* !hideAuthor && <AuthorOverview author={board.event.author} /> */}
              {/* TODO: update AuthorOverview */}
              {!hideAuthor && (
                <Link
                  to={`/p/${board.event.author.npub}`}
                  state={{ backgroundLocation: location }}
                  className="text-xs font-semibold text-white focus:border-none focus:outline-none hover:underline"
                >
                  {ellipsis(board.event.author.profile?.name || '', 30)}
                </Link>
              )}

              <h3 className="text-sm font-bold text-white [overflow-wrap:anywhere]">
                {ellipsis(board.title, 60)}
              </h3>
            </Transition.Child>
            <Link
              to={`/p/${board.event.author.npub}/${encodeURIComponent(board.title)}`}
              state={{ backgroundLocation: location }}
            >
              <Transition.Child
                as="div"
                className="z-[1] absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
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
            src={loader(board.image, { w: 300 })}
            alt={board.title}
            className="h-full w-full text-gray-100 min-h-[100px] object-contain"
            loading="lazy"
          />
        </div>

        {/* <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 [overflow-wrap:anywhere] hover:underline">
              {ellipsis(board.title, 60)}
            </h3>

            {!hideAuthor && <AuthorOverview author={board.event.author} />}
          </div>
          <div className="ml-4 mt-[2px] flex items-start gap-4">
            <BoardLikeButton board={board} />
            <BoardZapButton board={board} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export const MemoizedBoardItem = memo(
  BoardItem,
  (prev, next) => prev.board.event.id == next.board.event.id
);
