import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

import { useCommentsParams } from '@/logic/hooks';
import { useBoardReactions } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, numberEllipsis } from '@/logic/utils';

interface Params {
  board: Board;
  bgHover?: boolean;
}

export const BoardCommentButton = ({ board, bgHover = false }: Params) => {
  const { data: reactions } = useBoardReactions(board);

  const { toggleCommentsParams } = useCommentsParams();

  return (
    <>
      <button
        type="button"
        onClick={toggleCommentsParams}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900',
          bgHover ? 'hover:bg-gray-200' : ''
        )}
      >
        <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
        <span>{reactions ? numberEllipsis(reactions.comments.length) : 0}</span>
      </button>
    </>
  );
};
