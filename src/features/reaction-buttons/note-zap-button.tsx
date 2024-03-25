import { BoltIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useMemo, useState } from 'react';

import { useNoteZaps, useUser } from '@/shared/hooks/queries';
import { getInvoiceAmount, cn, numberEllipsis } from '@/shared/utils';

import { ZapModal } from '@/features';

// TODO: refactor ALL reaction buttons

export const NoteZapButton = ({ note }: { note: NDKEvent }) => {
  const [showModal, setShowModal] = useState(false);

  const { zaps } = useNoteZaps(note);

  const { pubkey } = useUser();

  const zapedByUser = useMemo(() => !!zaps.find((event) => event.pubkey == pubkey), [zaps, pubkey]);

  const zapAmounts = useMemo(
    () =>
      zaps.length > 0
        ? zaps.map((zap) => getInvoiceAmount(zap.tags.find((t) => t[0] === 'bolt11')?.[1] || ''))
        : undefined,
    [zaps]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={cn(
          'inline-flex justify-center text-xs font-semibold',
          zapedByUser
            ? 'text-yellow-600 hover:text-yellow-700'
            : 'text-gray-600 hover:text-gray-900'
        )}
      >
        <BoltIcon className="h-4 w-4" aria-hidden="true" />
        <span className="ml-1">
          {zapAmounts ? numberEllipsis(zapAmounts.reduce((a, b) => a + b)) : 0}
        </span>
      </button>

      {showModal && note && <ZapModal note={note} onClose={() => setShowModal(false)} />}
    </>
  );
};
