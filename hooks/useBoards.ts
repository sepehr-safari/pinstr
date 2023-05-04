import { usePubkey, useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';

import { Event } from 'nostr-hooks/dist/types';

const parseBoardsFromEvents = (events: Event[]) => {
  type Board = {
    id: string;
    name: string;
  };

  const boards = events.reduce<Board[]>((acc, event) => {
    const tags = event.tags;
    const dTag = tags.find((tag) => tag[0] === 'd');
    if (dTag && dTag.length > 1) {
      acc.push({ id: event.id, name: dTag[1] });
    }
    return acc;
  }, []);

  return boards;
};

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
