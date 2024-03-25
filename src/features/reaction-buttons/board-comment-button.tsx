import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useEffect, useState } from 'react';

import { useCommentsParams } from '@/shared/hooks/common';
import type { Board } from '@/shared/types';
import { cn, numberEllipsis } from '@/shared/utils';

type Props = {
  board: Board;
  bgHover?: boolean;
};

export const BoardCommentButton = ({ board, bgHover = false }: Props) => {
  const [comments, setComments] = useState<NDKEvent[]>([]);

  const { ndk } = useNdk();

  useEffect(() => {
    ndk
      .fetchEvents([{ kinds: [1], limit: 100, '#a': [board.event.tagAddress()] }])
      .then((events) => {
        setComments([...events]);
      });
  }, [ndk, setComments, board.event.id]);

  const { toggleCommentsParams } = useCommentsParams();

  return (
    <>
      <button
        type="button"
        onClick={toggleCommentsParams}
        className={cn(
          'inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900',
          bgHover ? 'hover:bg-gray-200' : ''
        )}
      >
        <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
        <span>{numberEllipsis(comments.length)}</span>
      </button>
    </>
  );
};
