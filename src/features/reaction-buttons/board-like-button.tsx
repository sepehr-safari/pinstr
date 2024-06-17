import { HeartIcon } from '@heroicons/react/20/solid';
import { useMemo } from 'react';

import { useBoardLikes, useUser } from '@/shared/hooks/queries';

import type { Board } from '@/shared/types';

import { joinClassNames, numberEllipsis } from '@/shared/utils';

type Props = {
  board: Board;
  bgHover?: boolean;
  circular?: boolean;
  showCount?: boolean;
};

export const BoardLikeButton = ({
  board,
  bgHover = false,
  circular = false,
  showCount = false,
}: Props) => {
  const { likes } = useBoardLikes(board);

  // TODO: handle not-logged-in users
  const like = async () => await board?.event.react('+');

  const { pubkey } = useUser();

  const likedByUser = useMemo(
    () => !!likes.find((event) => event.pubkey == pubkey),
    [likes, pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => !likedByUser && like()}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold bg-white',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900',
          bgHover && !likedByUser ? 'hover:bg-gray-200' : '',
          circular ? 'rounded-full p-2' : ''
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />

        {showCount === true && <span className="ml-1">{numberEllipsis(likes.length)}</span>}
      </button>
    </>
  );
};
