import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

import { useCommentsParams } from '@/logic/hooks';
import { useBoardReactions } from '@/logic/queries';
import { Board } from '@/logic/types';

export const BoardCommentButton = ({ board }: { board: Board }) => {
  const { data: reactions } = useBoardReactions(board);

  const { toggleCommentsParams } = useCommentsParams();

  return (
    <>
      <button
        type="button"
        onClick={toggleCommentsParams}
        className="inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900"
      >
        <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
        <span>{reactions ? reactions.comments.length : 0}</span>
      </button>
    </>
  );
};
