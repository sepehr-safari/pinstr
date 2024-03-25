import { HeartIcon } from '@heroicons/react/20/solid';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import type { Board } from '@/shared/types';
import { cn, numberEllipsis } from '@/shared/utils';

type Props = {
  board: Board;
  bgHover?: boolean;
};

export const BoardLikeButton = ({ board, bgHover = false }: Props) => {
  const [likes, setLikes] = useState<NDKEvent[]>([]);

  const { activeUser } = useActiveUser();
  const { ndk } = useNdk();

  useEffect(() => {
    ndk
      .fetchEvents([{ kinds: [7], limit: 100, '#a': [board.event.tagAddress()] }])
      .then((events) => {
        setLikes([...events]);
      });
  }, [ndk, setLikes, board.event.id]);

  const likedByUser = useMemo(
    () => !!likes.find((event) => event.pubkey == activeUser?.pubkey),
    [likes, activeUser?.pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => !likedByUser && board.event.react('+')}
        className={cn(
          'inline-flex justify-center items-center text-xs font-semibold',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900',
          bgHover && !likedByUser ? 'hover:bg-gray-200' : ''
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{numberEllipsis(likes.length)}</span>
      </button>
    </>
  );
};
