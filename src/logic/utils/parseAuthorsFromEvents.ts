import { Event, nip19 } from 'nostr-tools';

import { Author } from '@/logic/types';

export const parseAuthorsFromEvents = (events: Event[]) => {
  const authors: Author[] = [];
  for (const event of events) {
    const eventContent = JSON.parse(event.content || '{}');

    authors.push({
      about: eventContent.about || '',
      banner: eventContent.banner || '',
      hexPubkey: event.pubkey || '',
      lud06: eventContent.lud06 || '',
      lud16: eventContent.lud16 || '',
      name: eventContent.name || '',
      nip05: eventContent.nip05 || '',
      picture: eventContent.picture || '',
      website: eventContent.website || '',
      displayName: eventContent.display_name || eventContent.name,
      npub: nip19.npubEncode(event.pubkey),
      event: event as Event<0>,
    });
  }

  return authors;
};
