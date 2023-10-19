import { Format, NDKBoard, Pin } from '@/logic/types';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export const parseBoardFromEvent = (event: NDKEvent) => {
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
    throw new Error('Invalid board');
  }

  if (format in Format == false) {
    throw new Error('Invalid board');
  }

  const board: Omit<NDKBoard, 'author'> = {
    id: event.id,
    timestamp: event.created_at || 1,
    title,
    image,
    description,
    category,
    headers,
    tags,
    pins,
    format: format as Format,
    event,
  };

  return board;
};
