import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { formatRelative } from 'date-fns';
import { useActiveUser, useNdk, useNewEvent, useProfiles } from 'nostr-hooks';
import { useEffect, useState } from 'react';

import { NoteCommentButton, NoteLikeButton, NoteZapButton } from '@/features/reaction-buttons';

import { Spinner } from '@/shared/components';
import { loader } from '@/shared/utils';

export const Comment = ({ event }: { event: NDKEvent }) => {
  const [inputText, setInputText] = useState('');
  const [showReply, setShowReply] = useState(false);
  const [comments, setComments] = useState<NDKEvent[]>([]);

  const { activeUser } = useActiveUser();
  const { ndk } = useNdk();
  const { createNewEvent } = useNewEvent();

  const { events: eventsWithProfile } = useProfiles({ events: [event] });
  const author = eventsWithProfile?.[0].author;
  const image = author.profile?.image || '';
  const name = author.profile?.name || '';

  useEffect(() => {
    ndk.fetchEvents([{ kinds: [1], limit: 100, '#e': [event.id] }]).then((events) => {
      setComments([...events]);
    });
  }, [ndk, setComments, event.id]);

  // const filteredComments = useMemo(
  //   () =>
  //     comments.filter((commentEvent) => {
  //       const lastETag = commentEvent.tags.reverse().find((tag) => tag[0] == 'e');

  //       if (lastETag?.[1] == event.id) return true;

  //       return false;
  //     }),
  //   [comments]
  // );

  if (eventsWithProfile.length === 0) {
    return (
      <div className="h-12 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="my-2 flex w-full py-2 px-2 rounded-md hover:bg-gray-50">
        <div className="shrink-0">
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={loader(image, { w: 96, h: 96 })}
            alt=""
          />
        </div>

        <div className="ml-2 text-xs grow flex flex-col gap-2">
          <div>
            <button
              type="button"
              className="font-semibold text-gray-700 hover:underline hover:text-gray-900"
            >
              {name}
            </button>

            <span className="ml-1 font-light text-gray-500 [overflow-wrap:anywhere]">
              {event.content}
            </span>
          </div>

          <div className="flex gap-6 items-center">
            <NoteLikeButton note={event} />
            <NoteZapButton note={event} />
            <NoteCommentButton
              note={event}
              onClick={() => !!activeUser && setShowReply((prev) => !prev)}
            />

            <p className="ml-auto text-[0.6rem] font-light text-gray-500">
              {formatRelative(new Date((event.created_at || 1) * 1000), new Date())}
            </p>
          </div>

          {showReply && (
            <div className="flex gap-2 w-full py-2">
              <div className="flex items-center grow">
                <label htmlFor="text" className="sr-only">
                  Text
                </label>
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="block text-xs w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600"
                  placeholder="Reply"
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
                    e.tags.push(['e', event.id]);
                    e.tags.push(['p', event.author.pubkey]);
                    e.publish();

                    setInputText('');
                  }}
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ml-4">
        {comments.map((event) => (
          <Comment key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
