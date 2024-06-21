import { Transition } from '@headlessui/react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import { useFiltersParams } from '@/shared/hooks/common';
import { useUser } from '@/shared/hooks/queries';

import { Board } from '@/shared/types';
import { ellipsis, loader } from '@/shared/utils';

import { BoardBooster, EllipsisPopover } from '@/features';
import { BoardLikeButton, BoardZapButton } from '@/features/reaction-buttons';

// TODO: refactor
const BoardItem = ({ board, hideAuthor = false }: { board: Board; hideAuthor?: boolean }) => {
  const [isHovering, setIsHover] = useState<boolean | undefined>(false);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.event.author.pubkey : false;

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation =
    state && state.backgroundLocation ? state.backgroundLocation : location;

  // const { format, category } = useFiltersParams();

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-sm bg-gray-100 hover:cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* <div className="relative overflow-hidden rounded-sm bg-gray-100 hover:cursor-pointer"> */}
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

        <Link
          to={`/p/${board.event.author.npub}/${encodeURIComponent(board.title)}`}
          state={{ backgroundLocation }}
          className="z-[4] absolute inset-0"
        />

        <Transition
          show={isHovering}
          enter="duration-200 delay-100"
          enterFrom="opacity-0 translate-x-2"
          enterTo="opacity-100 translate-x-0"
          leave="duration-200"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-2"
        >
          <div className="z-[4] absolute right-4 top-4 flex gap-2">
            <BoardLikeButton board={board} circular />
            <BoardZapButton board={board} circular />
            <BoardBooster board={board} />
            {/* TODO: Slideover comments section from right */}
            {/* <BoardCommentButton board={board} circular /> */}
          </div>
        </Transition>

        {/* !hideAuthor && <AuthorOverview author={board.event.author} /> */}
        {/* TODO: update AuthorOverview */}

        <Transition
          show={isHovering}
          enter="duration-200 delay-100"
          enterFrom="opacity-0 translate-x-0"
          enterTo="opacity-100 translate-x-2"
          leave="duration-200"
          leaveFrom="opacity-100 translate-x-2"
          leaveTo="opacity-0 translate-x-0"
        >
          <div className="z-[4] absolute left-2 bottom-4 right-4 text-white">
            {!hideAuthor && (
              <Link
                to={`/p/${board.event.author.npub}`}
                state={{ backgroundLocation }}
                className="text-xs font-semibold focus:border-none focus:outline-none hover:underline"
              >
                <h3>{ellipsis(board.event.author.profile?.name || '', 30)}</h3>
              </Link>
            )}

            <Link
              to={`/p/${board.event.author.npub}/${encodeURIComponent(board.title)}`}
              state={{ backgroundLocation }}
              className="text-sm font-bold [overflow-wrap:anywhere] focus:border-none focus:outline-none hover:underline"
            >
              <h4>{ellipsis(board.title, 60)}</h4>
            </Link>
          </div>
        </Transition>

        <Transition
          show={isHovering}
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="z-[1] absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </Transition>

        <img
          src={loader(board.image, { w: 600 })}
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
      {/* </div> */}
    </>
  );
};

export const MemoizedBoardItem = memo(
  BoardItem,
  (prev, next) => prev.board.event.id == next.board.event.id
);
