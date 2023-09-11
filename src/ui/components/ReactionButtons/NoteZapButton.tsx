import { BoltIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { useMemo } from 'react';

import { joinClassNames } from '@/logic/utils';

import { useNoteReactions, useUser } from '@/logic/queries';

export const NoteZapButton = ({ note }: { note: Event<1> }) => {
  const { data: reactions } = useNoteReactions(note.id);

  const { pubkey } = useUser();

  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  return (
    <>
      <button
        type="button"
        // onClick={() => zap()}
        className={joinClassNames(
          'inline-flex justify-center text-xs font-semibold',
          zapedByUser
            ? 'text-yellow-600 hover:text-yellow-700'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <BoltIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">
          {reactions && reactions.zaps.length > 0 ? reactions.zaps.length : 0}
        </span>
      </button>
    </>
  );
};
