import { BoltIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { useMemo, useState } from 'react';

import { useNoteReactions, useUser } from '@/logic/queries';
import { getInvoiceAmount, joinClassNames, numberEllipsis } from '@/logic/utils';

import { ZapModal } from '@/ui/components';

export const NoteZapButton = ({ note }: { note: Event<1> }) => {
  const [showModal, setShowModal] = useState(false);

  const { data: reactions } = useNoteReactions(note.id);

  const { pubkey } = useUser();

  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  const zaps = useMemo(() => reactions?.zaps || [], [reactions]);

  const zapAmounts = useMemo(
    () => zaps.map((zap) => getInvoiceAmount(zap.tags.find((t) => t[0] === 'bolt11')?.[1] || '')),
    [zaps]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={joinClassNames(
          'inline-flex justify-center text-xs font-semibold',
          zapedByUser
            ? 'text-yellow-600 hover:text-yellow-700'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <BoltIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">
          {zaps.length > 0 ? numberEllipsis(zapAmounts.reduce((a, b) => a + b)) : 0}
        </span>
      </button>

      {showModal && note && <ZapModal note={note} onClose={() => setShowModal(false)} />}
    </>
  );
};
