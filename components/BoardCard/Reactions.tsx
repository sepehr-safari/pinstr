import {
  BoltIcon,
  ChatBubbleLeftIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarFilledIcon } from '@heroicons/react/24/solid';
import { usePubkey } from 'nostr-hooks';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Event } from 'nostr-hooks/dist/types';

import { useStar } from '@/hooks';

import LoginWarning from './LoginWarning';

type Params = {
  board?: Board | undefined;
  note?: Event | undefined;
  starsEvents: Event[];
  invalidateReactions: () => void;
  setCommentorState: Dispatch<SetStateAction<boolean>>;
};

const Reactions = ({
  board,
  note,
  starsEvents,
  invalidateReactions,
  setCommentorState,
}: Params) => {
  const [loginWarningState, setLoginWarningState] = useState(false);

  const viewerPubkey = usePubkey();
  const { starBoard, starNote } = useStar();

  const showLoginWarning = useCallback(() => {
    setLoginWarningState(true);
    const timeoutId = setTimeout(() => {
      setLoginWarningState(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="px-4 py-2 gap-10 flex items-center border-t border-neutral">
        {viewerPubkey &&
        starsEvents.length > 0 &&
        starsEvents.some((e) => e.pubkey === viewerPubkey) ? (
          <StarFilledIcon className="h-5 w-5 text-primary" />
        ) : (
          <div
            className="h-5 w-5 cursor-pointer hover:rotate-[20deg] transition-all duration-500 hover:text-primary"
            onClick={() =>
              viewerPubkey
                ? board
                  ? starBoard(board, invalidateReactions)
                  : note && starNote(note, invalidateReactions)
                : showLoginWarning()
            }
          >
            <StarIcon className="h-5 w-5" />
          </div>
        )}
        <div
          className="h-5 w-5 cursor-pointer hover:rotate-[20deg] transition-all duration-500 hover:text-primary"
          onClick={() =>
            viewerPubkey
              ? setCommentorState((state) => !state)
              : showLoginWarning()
          }
        >
          <ChatBubbleLeftIcon className="h-5 w-5" />
        </div>
        <div className="h-5 w-5 cursor-pointer hover:rotate-[20deg] transition-all duration-500 hover:text-primary">
          <BoltIcon className="h-5 w-5" />
        </div>
      </div>

      {loginWarningState == true && <LoginWarning />}
    </>
  );
};

export default Reactions;
