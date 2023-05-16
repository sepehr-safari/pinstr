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

type BoardCardProps = {
  boardAuthor: string;
  boardName: string;
};

const BoardCard = ({ boardAuthor, boardName }: BoardCardProps) => {
  const [commentorState, setCommentorState] = useState(false);
  const [commentsState, setCommentsState] = useState(false);

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
              className="flex gap-2 items-center  hover:text-primary hover:translate-x-1 ease-in-out transition-all duration-200"
            >
              <div className="h-6 w-6">
                <FolderIcon className="h-6 w-6" />
              </div>
              <h3 className="lg:text-lg font-bold flex items-start gap-2">
                {boardName}
              </h3>
            </Link>

            <Link
              prefetch={false}
              href={`/explore/${boardName}`}
              className="ml-auto btn btn-xs bg-neutral"
            >
              Explore
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-sm lg:text-base">
            {boards.length > 0 &&
              boards[0].pins.length > 0 &&
              boards[0].pins.map((pin) => (
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
                    <span className="mr-8">{pin[0]}</span>
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
                              <span className="break-all">
                                {item.startsWith('https://' || 'http://') ? (
                                  <a className="text-primary" href={item}>
                                    {item}
                                  </a>
                                ) : (
                                  item
                                )}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
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
