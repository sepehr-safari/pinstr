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
      <div className="p-2 flex flex-col items-center border-t-2 border-neutral gap-2">
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
                className="flex flex-col w-full border-2 border-neutral rounded-lg"
              >
                <SingleComment event={event} />
              </div>
            ))}
      </div>
    </>
  );
};

export default Comments;
