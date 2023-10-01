import { EventTemplate } from 'nostr-tools';

export const makeZapRequest = ({
  profile,
  e,
  a,
  amount,
  relays,
  comment = '',
}: {
  profile: string;
  e: string | null;
  a: string | null;
  amount: number;
  comment: string;
  relays: string[];
}): EventTemplate<9734> => {
  if (!amount) throw new Error('amount not given');
  if (!profile) throw new Error('profile not given');

  let zr: EventTemplate<9734> = {
    kind: 9734,
    created_at: Math.round(Date.now() / 1000),
    content: comment,
    tags: [
      ['p', profile],
      ['amount', amount.toString()],
      ['relays', ...relays],
    ],
  };

  if (!!e) {
    zr.tags.push(['e', e]);
  } else if (!!a) {
    zr.tags.push(['a', a]);
  }

  return zr;
};
