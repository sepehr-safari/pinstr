import { BoltIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';

import { useBoardZaps, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { getInvoiceAmount, joinClassNames, numberEllipsis } from '@/logic/utils';

import { ZapModal } from '@/ui/components';

interface Params {
  board: Board;
  bgHover?: boolean;
}

export const BoardZapButton = ({ board, bgHover = false }: Params) => {
  const [showModal, setShowModal] = useState(false);

  const { zaps } = useBoardZaps(board);

  const { pubkey } = useUser();

  const zapedByUser = useMemo(() => !!zaps.find((event) => event.pubkey == pubkey), [zaps, pubkey]);

  const zapAmounts = useMemo(
    () =>
      zaps.length > 0
        ? zaps.map((zap) => getInvoiceAmount(zap.tagValue('bolt11') || ''))
        : undefined,
    [zaps]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={joinClassNames(
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

      {showModal && board && <ZapModal board={board} onClose={() => setShowModal(false)} />}
    </>
  );
};
