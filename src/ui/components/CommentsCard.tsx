import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useBoard, useBoardReactions, useUser } from '@/logic/queries';

import { useMutateBoardComment } from '@/logic/mutations';
import { Comment, Spinner } from '@/ui/components';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const CommentsCard = () => {
  const [inputText, setInputText] = useState('');

  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: board, status: boardStatus } = useBoard({ author: hex, title: title });

  const { data: reactions, status: reactionsStatus } = useBoardReactions(board);

  const { metadata: selfUser } = useUser();

  const mutateBoardComment = useMutateBoardComment(board);

  if (!boardStatus) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
      <div className="w-full flex flex-col justify-between items-center p-2">
        {reactionsStatus == 'loading' ? (
          <div className="h-32 flex justify-center items-center">
            <Spinner />
          </div>
        ) : reactions?.comments.length == 0 ? (
          <div className="py-2 text-center">
            <p className="text-sm font-semibold">No Comments yet!</p>
            <p>Add one to start the conversation.</p>
          </div>
        ) : (
          reactions?.comments
            .filter((event) => event.tags[0][0] == 'a')
            .map((event) => <Comment key={event.id} event={event} />)
        )}

        <div className="flex gap-2 w-full border-t mt-2 p-2 pt-4">
          <div className="h-9 w-9 rounded-full overflow-hidden">
            <img className="" src={selfUser?.picture} alt="" />
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
              onClick={() => {
                mutateBoardComment.mutate(inputText);
                setInputText('');
              }}
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
