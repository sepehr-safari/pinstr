import { HeartIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { useMemo } from 'react';

import { useMutateNoteLike } from '@/logic/mutations';
import { useNoteReactions, useUser } from '@/logic/queries';
import { joinClassNames } from '@/logic/utils';

export const NoteLikeButton = ({ note }: { note: Event<1> }) => {
  const { data: reactions } = useNoteReactions(note.id);
  const { mutate: like } = useMutateNoteLike(note);

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
          'inline-flex justify-center text-xs font-semibold',
          likedByUser ? 'text-red-600 hover:cursor-default' : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <HeartIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">
          {reactions && reactions.likes.length > 0 ? reactions.likes.length : 0}
        </span>
      </button>
    </>
  );
};
