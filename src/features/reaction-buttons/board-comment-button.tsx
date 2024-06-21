import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

import { useCommentsParams } from '@/shared/hooks/common';
import { useBoardComments } from '@/shared/hooks/queries';

import type { Board } from '@/shared/types';

import { joinClassNames, numberEllipsis } from '@/shared/utils';

type Props = {
  board: Board;
  bgHover?: boolean;
  circular?: boolean;
  showCount?: boolean;
};

export const BoardCommentButton = ({
  board,
  bgHover = false,
  circular = false,
  showCount = false,
}: Props) => {
  const { comments } = useBoardComments(board);

  const { toggleCommentsParams } = useCommentsParams();

  return (
    <>
      <button
        type="button"
        onClick={toggleCommentsParams}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold bg-white border duration-200 text-gray-600 hover:text-gray-900',
          bgHover ? 'hover:bg-gray-200' : '',
          circular ? 'rounded-full p-2' : ''
        )}
      >
        <ChatBubbleLeftIcon className="h-4 w-4" />

        {showCount === true && <span className="ml-1">{numberEllipsis(comments.length)}</span>}
      </button>
    </>
  );
};
