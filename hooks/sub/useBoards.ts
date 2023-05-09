import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { parseBoardsFromEvents } from '@/utils';

import { Filter } from 'nostr-hooks/dist/types';

type Params = {
  pubkeys?: string[] | undefined;
  boardName?: string | undefined;
  enabled: boolean;
  autoInvalidate?: boolean;
};

const useBoards = ({ pubkeys, boardName, enabled, autoInvalidate }: Params) => {
  const filter: Filter = {
    kinds: [33888],
    limit: 20,
  };
  if (!!pubkeys && pubkeys.length > 0) {
    filter.authors = pubkeys;
  }
  if (!!boardName) {
    filter['#d'] = [boardName];
  }

  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: [filter],
    options: { enabled, invalidate: autoInvalidate },
  });

  const boards = useMemo(() => parseBoardsFromEvents(events), [events]);

  return { boards, eose, events, invalidate };
};

export default useBoards;
