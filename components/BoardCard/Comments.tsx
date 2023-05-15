import { Event } from 'nostr-hooks/dist/types';

import SingleComment from './SingleComment';

type Params = {
  commentsEvents: Event[];
  board?: Board | undefined;
  note?: Event | undefined;
};

const Comments = ({ commentsEvents, board, note }: Params) => {
  return (
    <>
      <div className="p-4 flex flex-col items-center border-t border-neutral gap-4">
        {commentsEvents.length > 0 &&
          commentsEvents
            .filter((event) => {
              if (event.tags.length == 0) return false;

              const firstTag = event.tags[0];

              if (firstTag[0] == 'a') {
                if (!board) return false;

                if (firstTag[1] == `33888:${board.pubkey}:${board.name}`)
                  return true;
              } else if (firstTag[0] == 'e') {
                if (!note) return false;

                if (firstTag[1] == note.id) return true;
              }

              return false;
            })
            .map((event) => (
              <div
                key={event.id}
                className="flex flex-col w-full border border-neutral rounded-lg"
              >
                <SingleComment event={event} />
              </div>
            ))}
      </div>
    </>
  );
};

export default Comments;
