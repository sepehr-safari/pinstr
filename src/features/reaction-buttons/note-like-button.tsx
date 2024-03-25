import { HeartIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { cn, numberEllipsis } from '@/shared/utils';

export const NoteLikeButton = ({ note }: { note: NDKEvent }) => {
  const [likes, setLikes] = useState<NDKEvent[]>([]);

  const { activeUser } = useActiveUser();
  const { ndk } = useNdk();

  useEffect(() => {
    ndk.fetchEvents([{ kinds: [7], limit: 100, '#e': [note.id] }]).then((events) => {
      setLikes([...events]);
    });
  }, [ndk, setLikes, note.id]);

  const likedByUser = useMemo(
    () => !!likes.find((event) => event.pubkey == activeUser?.pubkey),
    [likes, activeUser?.pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => !likedByUser && note.react('+')}
        className={cn(
          'inline-flex justify-center text-xs font-semibold',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{numberEllipsis(likes.length)}</span>
      </button>
    </>
  );
};
