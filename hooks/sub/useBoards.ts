import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { parseBoardsFromEvents } from '@/utils';

import { Filter } from 'nostr-hooks/dist/types';

type Params = {
  pubkey?: string | undefined;
  boardName?: string | undefined;
  enabled: boolean;
};

const useBoards = ({ pubkey, boardName, enabled }: Params) => {
  const filter: Filter = {
    kinds: [33888],
    limit: 20,
  };
  if (!!pubkey) {
    filter.authors = [pubkey];
  }
  if (!!boardName) {
    filter['#d'] = [boardName];
  }

  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: [filter],
    options: { enabled },
  });

  const boards = useMemo(() => parseBoardsFromEvents(events), [events]);

  return { boards, eose, events, invalidate };
};

export default useBoards;
