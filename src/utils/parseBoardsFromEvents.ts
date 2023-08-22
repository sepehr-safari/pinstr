import { Event } from 'nostr-tools';

import { Board, Pin } from '@/types';

export const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Board[] = [];
  for (const event of events) {
    const eventTags = event.tags;

    let title: string = '';
    let image: string = '';
    let description: string = '';
    let type: string = '';
    let category: string = '';
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
        case 'type':
          type = t[1];
          continue;
        case 'category':
          category = t[1];
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

    if (
      !title ||
      !image ||
      !description ||
      !type ||
      !category ||
      headers.length == 0
    ) {
      continue;
    }

    boards.push({
      id: event.id,
      timestamp: event.created_at,
      author: event.pubkey,
      title,
      image,
      description,
      type,
      category,
      headers,
      tags,
      pins,
    });
  }

  return boards;
};
