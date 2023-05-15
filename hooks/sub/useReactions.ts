import { useSubscribe } from 'nostr-hooks';

type Params = {
  boardId: string | undefined;
};

const useReactions = ({ boardId }: Params) => {
  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: boardId ? [{ '#e': [boardId], kinds: [1, 7, 9735] }] : [],
    options: { enabled: !!boardId, batchingInterval: 800 },
  });

  return {
    starsEvents: events.filter((event) => event.kind === 7),
    commentsEvents: events.filter((event) => event.kind === 1),
    zapEvents: events.filter((event) => event.kind === 9735),
    isFetchingReactions: !eose && !events.length,
    isReactionsEmpty: eose && !events.length,
    invalidate,
  };
};

export default useReactions;
