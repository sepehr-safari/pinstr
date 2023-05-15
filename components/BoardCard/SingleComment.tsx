import { Event } from 'nostr-hooks/dist/types';
import { useState } from 'react';

import { useMetadata, useReactions } from '@/hooks';

import { formatRelativeTime } from '@/utils';

import ReactionsSummary from './ReactionsSummary';
import Comments from './Comments';
import Commentor from './Commentor';
import Reactions from './Reactions';

type Params = {
  event: Event;
};

const SingleComment = ({ event }: Params) => {
  const [commentorState, setCommentorState] = useState(false);
  const [commentsState, setCommentsState] = useState(false);

  const { displayName, picture } = useMetadata({ pubkey: event.pubkey });

  const {
    commentsEvents,
    starsEvents,
    zapsEvents,
    isReactionsEmpty,
    isFetchingReactions,
    invalidate: invalidateReactions,
  } = useReactions({ note: event });

  return (
    <>
      <div className="flex items-start gap-4 w-full p-2">
        <div className="avatar">
          <div className="w-10 rounded-xl">
            <img src={picture || '/pinstr.png'} />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full">
            <h3 className="font-bold">{displayName}</h3>
            <p className="text-xs text-neutral-500 ml-auto">
              {event.created_at && formatRelativeTime(event.created_at)}
            </p>
          </div>
          <p className="">{event.content}</p>
        </div>
      </div>

      {!isFetchingReactions && !isReactionsEmpty && (
        <ReactionsSummary
          commentsEvents={commentsEvents}
          starsEvents={starsEvents}
          zapsEvents={zapsEvents}
          setCommentsState={setCommentsState}
        />
      )}

      {commentorState == true && (
        <Commentor note={event} invalidate={invalidateReactions} />
      )}

      <Reactions
        note={event}
        starsEvents={starsEvents}
        invalidateReactions={invalidateReactions}
        setCommentorState={setCommentorState}
      />

      {commentsState == true && (
        <Comments commentsEvents={commentsEvents} note={event} />
      )}
    </>
  );
};

export default SingleComment;
