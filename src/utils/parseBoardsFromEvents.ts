import { Event } from 'nostr-tools';

import { Board, Pin } from '@/types';

const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Board[] = [];
  for (const event of events) {
    const tags = event.tags;
    const dTag = tags.find((tag) => tag[0] === 'd');
    if (!dTag) continue;

    const headersTag = tags.find((tag) => tag[0] === 'headers');

    const pinTags = tags.filter(
      (tag) => tag[0] === 'pin' || tag[0] === 'p' || tag[0] === 'e'
    );

    const templateTag = tags.find((tag) => tag[0] === 'template');

    const CoverTag = tags.find((tag) => tag[0] === 'cover');

    boards.push({
      id: event.id,
      author: { pubkey: event.pubkey },
      name: dTag[1],
      template: templateTag ? templateTag[1] : 'text',
      cover: CoverTag ? CoverTag[1] : '',
      headers: headersTag ? headersTag.slice(1) : ['Content'],
      pins: pinTags.reduce<Pin[]>((pins, pinTag) => {
        return [...pins, pinTag.slice(1)];
      }, []),
    });
  }

  return boards;
};

export default parseBoardsFromEvents;
