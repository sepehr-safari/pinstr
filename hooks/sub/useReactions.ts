import { useSubscribe } from 'nostr-hooks';

const useReactions = (board: Board | undefined) => {
  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: board
      ? [
          {
            '#a': [`${33888}:${board.pubkey}:${board.name}`],
            kinds: [1, 7, 9735],
          },
        ]
      : [],
    options: { enabled: !!board, batchingInterval: 800 },
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
