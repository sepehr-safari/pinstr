import { BoltIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { nip19 } from 'nostr-tools';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useMutateBoardLike } from '@/logic/mutations';
import { useBoard, useBoardReactions, useUser } from '@/logic/queries';
import { formatRelativeTime, joinClassNames, loader } from '@/logic/utils';
import { HeartIcon } from '@heroicons/react/20/solid';

export const BoardSummary = () => {
  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : '';

  const { data: board } = useBoard({ author: hex, title: title! });

  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == hex : false;

  const likedByUser = useMemo(
    () => !!reactions?.likes.find((event) => event.pubkey == pubkey),
    [reactions?.likes, pubkey]
  );
  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  if (!board) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-white rounded-xl shadow-md text-xs hidden xl:block">
      <div className="w-full flex flex-col justify-between items-center">
        <div className="w-full py-4 px-4">
          <div className="inline-flex w-full justify-center items-center gap-1 text-xs font-light text-gray-400">
            <span>{board && formatRelativeTime(board.timestamp)}</span>
            <span>|</span>
            <span className="flex items-center">
              <Link to={`/c/${undefined}`} className="hover:underline">
                {board?.category}
              </Link>
            </span>
          </div>

          {board && board.tags.length > 0 && (
            <div className="mt-1 flex justify-center gap-4 flex-wrap">
              {board.tags.map((tag, index) => (
                <Link
                  to={`/t/${tag}`}
                  key={index}
                  className="text-xs font-light text-gray-400 hover:underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-2 border-t pt-4 flex flex-col w-full items-center text-center">
            <div className="w-40 h-32 rounded-md overflow-hidden">
              <img
                src={board ? loader(board?.image, { w: 500, h: 400 }) : ''}
                alt={title}
                className="w-full h-full bg-gray-200 text-gray-200"
                loading="lazy"
              />
            </div>

            <h3 className="mt-2 text-base font-semibold tracking-tight leading-5 text-gray-900">
              {title}
            </h3>

            <div className="mt-2 flex text-xs font-light text-gray-600 text-center">
              {board?.description}
            </div>

            {selfBoard && (
              <>
                <div className="mt-6 mb-2 flex gap-2 shrink-0 w-full">
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => {}}
                  >
                    Edit Board
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => {}}
                  >
                    Add Pin
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 w-full h-10 divide-x border-t">
          <button
            type="button"
            onClick={() => !likedByUser && like()}
            className={joinClassNames(
              'inline-flex justify-center items-center text-xs font-semibold',
              likedByUser
                ? 'text-red-600 hover:cursor-default'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <HeartIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.likes.length : 0}</span>
          </button>
          <button
            type="button"
            // onClick={() => zap()}
            className={joinClassNames(
              'inline-flex justify-center items-center text-xs font-semibold',
              zapedByUser
                ? 'text-yellow-600 hover:text-yellow-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            <BoltIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.zaps.length : 0}</span>
          </button>
          <button
            type="button"
            className="inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.comments.length : 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
