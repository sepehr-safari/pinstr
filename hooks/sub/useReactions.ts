import { useSubscribe } from 'nostr-hooks';
import { Event } from 'nostr-tools';

type Params = {
  board?: Board | undefined;
  note?: Event | undefined;
};

const useReactions = ({ board, note }: Params) => {
  const { events, eose, invalidate } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: board
      ? [
          {
            '#a': [`${33888}:${board.pubkey}:${board.name}`],
            kinds: [1, 7, 9735],
          },
        ]
      : note
      ? [
          {
            '#e': [note.id],
            kinds: [1, 7, 9735],
          },
        ]
      : [],
    options: { enabled: !!board || !!note, batchingInterval: 800 },
  });

  return {
    starsEvents: events.filter((event) => event.kind === 7),
    commentsEvents: events.filter((event) => event.kind === 1),
    zapsEvents: events.filter((event) => event.kind === 9735),
    isFetchingReactions: !eose && !events.length,
    isReactionsEmpty: eose && !events.length,
    invalidate,
  };
};

export default useReactions;
