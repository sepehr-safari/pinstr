import { usePubkey, useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { parseBoardsFromEvents } from '@/utils';

const useBoards = () => {
  const pubkey = usePubkey();

  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: [{ authors: [pubkey], kinds: [33888] }],
    options: { enabled: !!pubkey },
  });

  const boards = useMemo(() => parseBoardsFromEvents(events), [events]);

  return { boards, eose, events, pubkey, invalidate };
};

export default useBoards;
