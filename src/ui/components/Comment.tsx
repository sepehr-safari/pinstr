import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Event } from 'nostr-tools';
import { useMemo, useState } from 'react';

import { useMutateNoteComment } from '@/logic/mutations';
import { useAuthor, useNoteReactions, useUser } from '@/logic/queries';
import { formatRelativeTime, loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';
import { NoteCommentButton, NoteLikeButton, NoteZapButton } from '@/ui/components/ReactionButtons';

export const Comment = ({ event }: { event: Event<1> }) => {
  const [inputText, setInputText] = useState('');
  const [showReply, setShowReply] = useState(false);

  const { pubkey: selfPubkey } = useUser();

  const { data: author, status } = useAuthor(event.pubkey);
  const { data: reactions } = useNoteReactions(event.id);

  const comments = useMemo(() => {
    if (!reactions || !reactions.comments || reactions.comments.length == 0) {
      return [];
    }

    return reactions.comments.filter((commentEvent) => {
      const lastETag = commentEvent.tags.reverse().find((tag) => tag[0] == 'e');

      if (lastETag?.[1] == event.id) return true;

      return false;
    });
  }, [reactions, event.id]);

  const mutateNoteComment = useMutateNoteComment(event);

  if (status == 'loading') {
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
            src={loader(author.picture, { w: 96, h: 96 })}
            alt=""
          />
        </div>

        <div className="ml-2 text-xs grow flex flex-col gap-2">
          <div>
            <button
              type="button"
              className="font-semibold text-gray-700 hover:underline hover:text-gray-900"
            >
              {author.displayName}
            </button>

            <span className="ml-1 font-light text-gray-500">{event.content}</span>
          </div>

          <div className="flex gap-6 items-center">
            <NoteLikeButton note={event} />
            <NoteZapButton note={event} />
            <NoteCommentButton
              note={event}
              onClick={() => !!selfPubkey && setShowReply((prev) => !prev)}
            />

            <p className="ml-auto text-[0.6rem] font-light text-gray-500">
              {formatRelativeTime(event.created_at)}
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
                  onClick={() => {
                    mutateNoteComment.mutate(inputText);
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
