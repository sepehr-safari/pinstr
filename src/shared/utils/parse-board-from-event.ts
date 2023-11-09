import { Format, type Board, type Pin, Category } from '@/shared/types';
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
    return null;
  }

  if (format in Format == false) {
    return null;
  }

  if (category in Category == false) {
    return null;
  }

  const board: Board = {
    title,
    image,
    description,
    category: category as Category,
    headers,
    tags,
    pins,
    format: format as Format,
    event,
  };

  return board;
};
