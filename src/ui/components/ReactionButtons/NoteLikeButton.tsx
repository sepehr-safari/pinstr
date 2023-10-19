import { HeartIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import { useMutateNoteLike } from '@/logic/mutations';
import { useNoteLikes, useUser } from '@/logic/queries';
import { joinClassNames, numberEllipsis } from '@/logic/utils';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export const NoteLikeButton = ({ note }: { note: NDKEvent }) => {
  const { likes } = useNoteLikes(note);
  const { mutate: like } = useMutateNoteLike(note);

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
