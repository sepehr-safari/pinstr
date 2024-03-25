import { BoltIcon } from '@heroicons/react/20/solid';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { ZapModal } from '@/features';

import type { Board } from '@/shared/types';
import { cn, getInvoiceAmount, numberEllipsis } from '@/shared/utils';

type Props = {
  board: Board;
  bgHover?: boolean;
};

export const BoardZapButton = ({ board, bgHover = false }: Props) => {
  const [zaps, setZaps] = useState<NDKEvent[]>([]);

  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();

  useEffect(() => {
    ndk
      .fetchEvents([{ kinds: [9735], limit: 100, '#a': [board.event.tagAddress()] }])
      .then((events) => {
        setZaps([...events]);
      });
  }, [ndk, setZaps, board.event.id]);

  const zapedByUser = useMemo(
    () => !!zaps.find((event) => event.pubkey == activeUser?.pubkey),
    [zaps, activeUser?.pubkey]
  );

  const zapAmounts = useMemo(
    () =>
      zaps.length > 0
        ? zaps.map((zap) => getInvoiceAmount(zap.tagValue('bolt11') || ''))
        : undefined,
    [zaps]
  );

  return (
    <>
      <ZapModal target={{ type: 'event', event: board.event }}>
        <button
          type="button"
          className={cn(
            'inline-flex justify-center items-center text-xs font-semibold',
            zapedByUser
              ? 'text-yellow-600 hover:text-yellow-700'
              : 'text-gray-600 hover:text-gray-900',
            bgHover ? 'hover:bg-gray-200' : ''
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
