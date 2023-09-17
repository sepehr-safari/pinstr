import { HeartIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { useMutateBoardLike } from '@/logic/mutations';
import { useBoardReactions, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, numberEllipsis } from '@/logic/utils';

interface Params {
  board: Board;
  bgHover?: boolean;
}

export const BoardLikeButton = ({ board, bgHover = false }: Params) => {
  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();

  const likedByUser = useMemo(
    () => !!reactions?.likes.find((event) => event.pubkey == pubkey),
    [reactions?.likes, pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => !likedByUser && like()}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900',
          bgHover && !likedByUser ? 'hover:bg-gray-200' : ''
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">
          {reactions && reactions.likes.length > 0
            ? numberEllipsis(reactions.likes.length.toString(), 4)
            : 0}
        </span>
      </button>
    </>
  );
};
