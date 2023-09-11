import { PaperClipIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { useBoardSummary } from '@/logic/hooks';
import { formatRelativeTime, loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';
import {
  BoardCommentButton,
  BoardLikeButton,
  BoardZapButton,
} from '@/ui/components/ReactionButtons';

export const BoardSummary = () => {
  const { status, board, setCreatePinParams, setEditBoardParams, selfBoard } = useBoardSummary();

  if (status == 'loading') {
    return (
      <div className="h-32 flex justify-center items-center overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <Spinner />
      </div>
    );
  }

  if (!board) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
      <div className="w-full flex flex-col gap-4 pt-4 justify-between items-center divide-y">
        <div className="flex flex-col gap-2 text-xs font-light text-gray-400">
          <div className="flex w-full justify-center items-center gap-4">
            <span>{board && formatRelativeTime(board.timestamp)}</span>

            <span>|</span>

            <span className="flex items-center">
              <Link to={`/?category=${board.category}`} className="hover:underline">
                {board.category}
              </Link>
            </span>
          </div>

          {board && board.tags.length > 0 && (
            <div className="px-4 flex justify-center gap-x-4 gap-y-2 flex-wrap">
              {board.tags.map((tag, index) => (
                <Link to={`/?tag=${tag}`} key={index} className="hover:underline">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 flex flex-col gap-4 w-full items-center text-center">
          <div className="w-40 h-32 rounded-md overflow-hidden">
            <img
              src={board ? loader(board?.image, { w: 500, h: 400 }) : ''}
              alt={board?.title}
              className="w-full h-full bg-gray-200 text-gray-200"
              loading="lazy"
            />
          </div>

          <h3 className="text-base font-semibold tracking-tight leading-5 text-gray-900">
            {board.title}
          </h3>

          <div className="px-4 flex text-xs font-light text-gray-600 text-center">
            {board.description}
          </div>

          {selfBoard && (
            <>
              <div className="flex gap-2 shrink-0 w-full max-w-xs">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  onClick={setEditBoardParams}
                >
                  <PencilIcon className="-ml-2 w-4 h-4" />
                  <span className="ml-2">Edit Board</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  onClick={setCreatePinParams}
                >
                  <PaperClipIcon className="-ml-2 w-4 h-4" />
                  <span className="ml-2">Add Pin</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 w-full h-10 divide-x">
          <BoardLikeButton board={board} />
          <BoardZapButton board={board} />
          <BoardCommentButton board={board} />
        </div>
      </div>
    </div>
  );
};
