'use client';

import { FolderIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import { useBoards, useMetadata, useReactions } from '@/hooks';

import { formatRelativeTime } from '@/utils';

import Commentor from './Commentor';
import ReactionsSummary from './ReactionsSummary';
import Reactions from './Reactions';
import Comments from './Comments';
import Preview from './LinkView';
import LinkView from './LinkView';

type BoardCardProps = {
  boardAuthor: string;
  boardName: string;
};

const BoardCard = ({ boardAuthor, boardName }: BoardCardProps) => {
  const [commentorState, setCommentorState] = useState(false);
  const [commentsState, setCommentsState] = useState(false);
  const [numberOfVisiblePins, setNumberOfVisiblePins] = useState(3);

  const { displayName, picture, npub } = useMetadata({ pubkey: boardAuthor });
  const { boards, events } = useBoards({
    pubkeys: [boardAuthor],
    boardName,
    enabled: !!boardAuthor && !!boardName,
  });
  const {
    commentsEvents,
    starsEvents,
    zapsEvents,
    isReactionsEmpty,
    isFetchingReactions,
    invalidate: invalidateReactions,
  } = useReactions({ board: boards.length ? boards[0] : undefined });

  return (
    <>
      <div className="flex flex-col border-neutral-700 border-2 rounded-lg bg-base-200 max-w-screen-lg w-full">
        <div className="p-4 gap-4 flex items-center border-b-2 border-neutral">
          <Link
            prefetch={false}
            href={`/p/${npub}`}
            className="flex gap-2 items-center hover:translate-x-1 hover:text-primary ease-in-out transition-all duration-200"
          >
            <div className="avatar">
              <div className="w-10 rounded-xl">
                <img src={picture || '/pinstr.png'} />
              </div>
            </div>
            <h2 className="lg:text-lg">{displayName}</h2>
          </Link>
          <div className="ml-auto">
            <p className="text-xs text-neutral-500">
              {events.length > 0 && formatRelativeTime(events[0].created_at)}
            </p>
          </div>
        </div>
        <div className="flex flex-col grow gap-4 p-4">
          <div className="flex gap-2 items-center">
            <Link
              prefetch={false}
              href={`/p/${npub}/${boardName}`}
              className="flex gap-2 items-center hover:text-primary hover:translate-x-1 ease-in-out transition-all duration-200"
            >
              <div className="h-6 w-6">
                <FolderIcon className="h-6 w-6" />
              </div>
              <h3 className="lg:text-lg font-bold">{boardName}</h3>
              <span className="text-xs text-neutral-500">
                (kind: {events.length > 0 && events[0].kind})
              </span>
            </Link>

            <Link
              prefetch={false}
              href={`/frens/${boardName}`}
              className="ml-auto btn btn-xs bg-neutral"
            >
              Frens
            </Link>
            <Link
              prefetch={false}
              href={`/explore/${boardName}`}
              className="btn btn-xs bg-neutral"
            >
              Explore
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm lg:text-base">
            {boards.length > 0 &&
              boards[0].pins.length > 0 &&
              boards[0].pins.slice(0, numberOfVisiblePins).map((pin) => (
                <div
                  key={pin[0]}
                  tabIndex={0}
                  className={`bg-neutral rounded-lg${
                    pin.length > 1 ? ' collapse collapse-arrow' : ''
                  }`}
                >
                  <div className="collapse-title px-2 py-1 min-h-0 flex gap-2 items-center">
                    <div className="h-5 w-5">
                      <PaperClipIcon className="h-5 w-5" />
                    </div>
                    {pin[0].startsWith('npub1' || 'note1') ? (
                      <LinkView
                        link={'https://nostr.com/' + pin[0]}
                        view={pin[0]}
                      />
                    ) : (
                      <span className="mr-8">{pin[0]}</span>
                    )}
                  </div>
                  {pin.length > 1 && (
                    <div className="collapse-content">
                      <ul className="flex flex-col gap-2 mt-2">
                        {pin.slice(1).map((item, index) => (
                          <li key={boards[0].headers[index + 1]}>
                            <p className="flex flex-col md:flex-row md:gap-2">
                              <strong className="break-keep">
                                {boards[0].headers[index + 1]}:
                              </strong>
                              {item.startsWith('https://' || 'http://') ? (
                                <LinkView link={item} view={item} />
                              ) : item.startsWith('npub1' || 'note1') ? (
                                <LinkView
                                  link={'https://nostr.com/' + item}
                                  view={item}
                                />
                              ) : (
                                <span className="break-all">{item}</span>
                              )}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

            <div className="flex gap-2">
              {boards.length > 0 && numberOfVisiblePins > 3 && (
                <button
                  className="btn btn-xs bg-neutral"
                  onClick={() => setNumberOfVisiblePins(3)}
                >
                  Show Less
                </button>
              )}
              {boards.length > 0 &&
                boards[0].pins.length > 3 &&
                numberOfVisiblePins < boards[0].pins.length && (
                  <button
                    className="btn btn-xs bg-neutral"
                    onClick={() =>
                      setNumberOfVisiblePins(boards[0].pins.length)
                    }
                  >
                    Show All ({boards[0].pins.length} pins)
                  </button>
                )}
            </div>
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

        {commentorState == true && boards.length && (
          <Commentor
            board={boards.length ? boards[0] : undefined}
            invalidate={invalidateReactions}
          />
        )}

        <Reactions
          board={boards.length ? boards[0] : undefined}
          starsEvents={starsEvents}
          invalidateReactions={invalidateReactions}
          setCommentorState={setCommentorState}
        />

        {commentsState == true && (
          <Comments
            commentsEvents={commentsEvents}
            board={boards.length ? boards[0] : undefined}
          />
        )}
      </div>
    </>
  );
};

export default BoardCard;
