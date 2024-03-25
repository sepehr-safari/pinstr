import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk, useNewEvent } from 'nostr-hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Comment } from '@/features';

import { Spinner } from '@/shared/components';
import type { Board } from '@/shared/types';

export const CommentsCard = ({ board }: { board: Board }) => {
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { activeUser } = useActiveUser();
  const { ndk } = useNdk();
  const { createNewEvent } = useNewEvent();

  useEffect(() => {
    ndk
      .fetchEvents([{ kinds: [1], limit: 100, '#a': [board.event.tagAddress()] }])
      .then((events) => {
        setComments([...events]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [ndk, setComments, board.event.id]);

  return (
    <div className="overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
      <div className="w-full flex flex-col justify-between items-center p-2">
        {isLoading ? (
          <div className="h-32 flex justify-center items-center">
            <Spinner />
          </div>
        ) : comments.length == 0 ? (
          <div className="py-2 text-center">
            <p className="text-sm font-semibold">No Comments yet!</p>
            <p className="font-light">Add one to start the conversation.</p>
          </div>
        ) : (
          comments
            .filter((event) => {
              const firstTag = event.tags[0];

              if (firstTag[0] != 'a' || !board) {
                return false;
              }

              if (firstTag[1] == `33889:${board.event.author.pubkey}:${board.title}`) return true;
            })
            .map((event) => <Comment key={event.id} event={event} />)
        )}

        <div className="flex gap-2 w-full border-t mt-2 p-2 pt-4">
          {activeUser ? (
            <>
              <div className="h-9 w-9 rounded-full overflow-hidden">
                <img className="" src={activeUser.profile?.image} alt="" />
              </div>

              <div className="flex items-center grow">
                <label htmlFor="text" className="sr-only">
                  Text
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="block text-xs w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600"
                  placeholder="Add a comment"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-gray-500 hover:text-gray-700"
                  disabled={!inputText}
                  onClick={() => {
                    const e = createNewEvent();
                    e.kind = 1;
                    e.content = inputText;
                    e.tags.push(['a', board.event.tagAddress()]);
                    e.tags.push(['p', board.event.author.pubkey]);
                    e.publish();

                    setInputText('');
                  }}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-grow flex gap-4 justify-center items-center">
              <p className="text-xs font-semibold text-gray-600">Login to comment</p>
              <Link
                to="/login"
                className="rounded-full bg-gray-900 px-8 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
