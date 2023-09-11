import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

import { useNoteReactions } from '@/logic/queries';
import { Event } from 'nostr-tools';

export const NoteCommentButton = ({ note, onClick }: { note: Event<1>; onClick: () => void }) => {
  const { data: reactions } = useNoteReactions(note.id);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900"
      >
        <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
        <span>{reactions ? reactions.comments.length : 0}</span>
      </button>
    </>
  );
};
