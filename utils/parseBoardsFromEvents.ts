import { Event } from 'nostr-hooks/dist/types';

const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Board[] = [];
  for (let event of events) {
    const tags = event.tags;
    const dTag = tags.find((tag) => tag[0] === 'd');
    if (!dTag) continue;

    const headersTag = tags.find((tag) => tag[0] === 'headers');
    if (!headersTag) continue;

    const pinTags = tags.filter((tag) => tag[0] === 'pin');

    boards.push({
      id: event.id,
      pubkey: event.pubkey,
      name: dTag[1],
      headers: headersTag.slice(1),
      pins: pinTags.reduce<Pin[]>((pins, pinTag) => {
        return [...pins, pinTag.slice(1)];
      }, []),
    });
  }

  return boards;
};

export default parseBoardsFromEvents;
