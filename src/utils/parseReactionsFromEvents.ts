import { Event } from 'nostr-tools';

import { Reactions } from '@/types';

export const parseReactionsFromEvents = (events: Event[]) => {
  const reactions: Reactions = {
    likes: [],
    zaps: [],
    comments: [],
  };

  for (const event of events) {
    const eventKind = event.kind;

    switch (eventKind) {
      case 7:
        reactions.likes.push(event as Event<7>);
        continue;
      case 9735:
        reactions.zaps.push(event as Event<9735>);
        continue;
      case 1:
        reactions.comments.push(event as Event<1>);
        continue;
      default:
        continue;
    }
  }

  return reactions;
};
