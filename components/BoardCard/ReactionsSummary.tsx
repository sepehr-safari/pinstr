import { Event } from 'nostr-hooks/dist/types';
import { Dispatch, SetStateAction } from 'react';

type Params = {
  starsEvents: Event[];
  commentsEvents: Event[];
  zapsEvents: Event[];
  setCommentsState: Dispatch<SetStateAction<boolean>>;
};

const ReactionsSummary = ({
  starsEvents,
  commentsEvents,
  zapsEvents,
  setCommentsState,
}: Params) => {
  return (
    <div className="px-4 py-2 flex items-center border-t border-neutral text-sm text-neutral-400 gap-1">
      {starsEvents.length > 0 && (
        <>
          <span className="font-bold">{starsEvents.length}</span>
          <span>Stars</span>
        </>
      )}
      {starsEvents.length > 0 && commentsEvents.length > 0 && <span>-</span>}
      {commentsEvents.length > 0 && (
        <div
          className="inline-flex gap-1 hover:cursor-pointer"
          onClick={() => setCommentsState((state) => !state)}
        >
          <span>{commentsEvents.length}</span>
          <span>Comments</span>
        </div>
      )}
      {zapsEvents.length > 0 && (
        <div className="ml-auto flex items-center gap-1">
          <span>x</span>
          <span>Sats</span>
        </div>
      )}
    </div>
  );
};

export default ReactionsSummary;
