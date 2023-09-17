import { Event } from 'nostr-tools';

import { Board, Format, Pin } from '@/logic/types';

export const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Board[] = [];
  for (const event of events) {
    const eventTags = event.tags;

    let title: string = '';
    let image: string = '';
    let description: string = '';
    let category: string = '';
    let format: string = '';
    let headers: string[] = [];
    let tags: string[] = [];
    let pins: Pin[] = [];

    for (const t of eventTags) {
      const first = t[0];
      switch (first) {
        case 'd':
          title = t[1];
          continue;
        case 'image':
          image = t[1];
          continue;
        case 'description':
          description = t[1];
          continue;
        case 'c':
          category = t[1];
          continue;
        case 'f':
          format = t[1];
          continue;
        case 'headers':
          headers = t.slice(1);
          continue;
        case 't':
          tags.push(t[1]);
          continue;
        case 'pin':
          pins.push(t.slice(1));
          continue;
        default:
          continue;
      }
    }

    if (!format || !title || !image || !description || !category || headers.length == 0) {
      continue;
    }

    if (format in Format == false) {
      continue;
    }

    boards.push({
      id: event.id,
      timestamp: event.created_at,
      author: event.pubkey,
      title,
      image,
      description,
      category,
      headers,
      tags,
      pins,
      format: format as Format,
      event: event as Event<33889>,
    });
  }

  return boards;
};
