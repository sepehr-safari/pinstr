import { Event } from 'nostr-hooks/dist/types';
import { nip19 } from 'nostr-tools';

const parseBoardsFromEvents = (events: Event[]) => {
  const boards: Board[] = [];
  for (let event of events) {
    const kind = event.kind as number;
    const tags = event.tags;
    const dTag = tags.find((tag) => tag[0] === 'd');
    if (!dTag) continue;

    const headersTag =
      kind === 33888
        ? tags.find((tag) => tag[0] === 'headers')
        : ['headers', 'Name'];
    if (!headersTag) continue;

    const pinTags =
      kind === 33888
        ? tags.filter((tag) => tag[0] === 'pin')
        : tags
            .filter((tag) => tag[0] === 'p' || tag[0] === 'e')
            .map((tag) =>
              tag[0] === 'p'
                ? ['p', nip19.npubEncode(tag[1])]
                : ['e', nip19.noteEncode(tag[1])]
            );
    // if (!pinTags || pinTags.length === 0) continue;

    const avatarTag = tags.find((tag) => tag[0] === 'avatar');

    boards.push({
      id: event.id,
      pubkey: event.pubkey,
      name: dTag[1],
      avatar: avatarTag ? avatarTag[1] : '',
      headers: headersTag.slice(1),
      pins: pinTags.reduce<Pin[]>((pins, pinTag) => {
        return [...pins, pinTag.slice(1)];
      }, []),
    });
  }

  return boards;
};

export default parseBoardsFromEvents;
