import { BoltIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useEffect, useMemo, useState } from 'react';
import { useActiveUser, useNdk } from 'nostr-hooks';

import { ZapModal } from '@/features';

import { getInvoiceAmount, cn, numberEllipsis } from '@/shared/utils';

// TODO: refactor ALL reaction buttons

export const NoteZapButton = ({ note }: { note: NDKEvent }) => {
  const [zaps, setZaps] = useState<NDKEvent[]>([]);

  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();

  useEffect(() => {
    ndk.fetchEvents([{ kinds: [9735], limit: 100, '#e': [note.id] }]).then((events) => {
      setZaps([...events]);
    });
  }, [ndk, setZaps, note.id]);

  const zapedByUser = useMemo(
    () => !!zaps.find((event) => event.pubkey == activeUser?.pubkey),
    [zaps, activeUser?.pubkey]
  );

  const zapAmounts = useMemo(
    () =>
      zaps.length > 0
        ? zaps.map((zap) => getInvoiceAmount(zap.tags.find((t) => t[0] === 'bolt11')?.[1] || ''))
        : undefined,
    [zaps]
  );

  return (
    <>
      <ZapModal target={{ type: 'event', event: note }}>
        <button
          type="button"
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
      </ZapModal>
    </>
  );
};
