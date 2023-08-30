import { BoltIcon, ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { Link, useParams } from 'react-router-dom';

import { useMutateBoardLike } from '@/mutations';
import { useUser } from '@/queries';
import { Board, Reactions } from '@/types';
import { formatRelativeTime } from '@/utils';

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
    <div className="bg-white rounded-xl shadow-md mt-8 p-6 text-xs hidden xl:block">
      <div className="w-full flex flex-col justify-between items-center">
        <div className="w-full">
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
            <div className="mt-2 flex justify-center gap-4 flex-wrap">
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

          <div className="mt-6 border-t border-b py-6 flex gap-4 flex-col w-full items-center text-center">
            <h3 className="text-base font-semibold tracking-tight text-gray-900">{title}</h3>

            <div className="flex text-xs font-light text-gray-600 text-center">
              {board?.description}
            </div>

            {selfBoard && (
              <>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => {}}
                  >
                    Edit Board
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 hover:text-gray-900"
                    onClick={() => {}}
                  >
                    Add Pin
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800"
            onClick={() => like()}
          >
            <HandThumbUpIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.likes.length : 0}</span>
          </button>
          <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
            <BoltIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.zaps.length : 0}</span>
          </button>
          <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
            <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
            <span className="">{reactions ? reactions.comments.length : 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
