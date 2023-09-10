import { BoltIcon } from '@heroicons/react/20/solid';

import { joinClassNames } from '@/logic/utils';

import { useMemo } from 'react';

import { useBoardReactions, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { toast } from 'react-toastify';

export const BoardZapButton = ({ board }: { board: Board }) => {
  const { data: reactions } = useBoardReactions(board);

  const { pubkey } = useUser();

  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => toast('Zaps are still under developement!', { type: 'warning' })}
        className={joinClassNames(
          'inline-flex justify-center items-center text-xs font-semibold',
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
