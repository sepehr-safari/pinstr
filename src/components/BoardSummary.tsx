import { BoltIcon, ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { Link, useParams } from 'react-router-dom';

import { useMutateBoardLike } from '@/mutations';
import { useUser } from '@/queries';
import { Board, Reactions } from '@/types';
import { formatRelativeTime, loader } from '@/utils';

export const BoardSummary = () => {
  const { npub, title } = useParams();
  const hex = nip19.decode(npub!).data.toString();

  const queryClient = useQueryClient();
  const board = queryClient.getQueryData<Board>(['nostr', 'boards', hex, title]);
  const reactions = queryClient.getQueryData<Reactions>([
    'nostr',
    'boards',
    hex,
    title,
    'reactions',
  ]);

  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == hex : false;

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
            <div className="w-40 h-full rounded-md bg-gray-200 text-gray-200">
              <img
                src={board ? loader(board?.image, { w: 500, h: 400 }) : ''}
                alt={title}
                className="w-full h-full rounded-md"
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

        <div className="grid grid-cols-3 w-full h-10 divide-x border-t text-gray-600">
          <button
            className="inline-flex justify-center items-center text-xs font-semibold duration-200 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => like()}
          >
            <HandThumbUpIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.likes.length : 0}</span>
          </button>
          <button className="inline-flex justify-center items-center text-xs font-semibold duration-200 hover:text-gray-900 hover:bg-gray-100">
            <BoltIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.zaps.length : 0}</span>
          </button>
          <button className="inline-flex justify-center items-center text-xs font-semibold duration-200 hover:text-gray-900 hover:bg-gray-100">
            <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.comments.length : 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
