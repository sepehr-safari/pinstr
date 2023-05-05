import { Event } from 'nostr-hooks/dist/types';

const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Boards = new Map();
  events.forEach((event) => {
    const tags = event.tags;
    const pins: Pins = new Map();
    tags.forEach((tag) => {
      const key = tag[0];
      const values = tag.slice(1);
      let headers: string[] = [];
      if (key === 'd') {
        boards.set(values[0], pins);
      } else if (key === 'headers') {
        headers = values;
      } else if (key === 'pin') {
        const pin: Pin = new Map();
        values.forEach((value, index) => {
          const key = headers[index];
          if (key && key !== 'headers') {
            pin.set(key, value);
          }
        });
        pins.set(values[0], pin);
      }
    });
  });
  return boards;
};

export default parseBoardsFromEvents;
