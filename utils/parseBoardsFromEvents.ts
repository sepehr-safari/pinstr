import { Event } from 'nostr-hooks/dist/types';

const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Boards = {};
  for (let event of events) {
    const tags = event.tags;
    const dTag = tags.find((tag) => tag[0] === 'd');
    if (!dTag) continue;

    const headersTag = tags.find((tag) => tag[0] === 'headers');
    if (!headersTag) continue;

    const pinTags = tags.filter((tag) => tag[0] === 'pin');

    boards[dTag[1]] = {
      headers: headersTag.slice(1),
      pins: pinTags.reduce<Pins>((pins, pinTag) => {
        pins[pinTag[1]] = pinTag.slice(2);
        return pins;
      }, {}),
    };
  }

  return boards;
};

export default parseBoardsFromEvents;
