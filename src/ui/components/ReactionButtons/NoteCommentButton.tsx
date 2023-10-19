import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

import { useNoteComments } from '@/logic/queries';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export const NoteCommentButton = ({ note, onClick }: { note: NDKEvent; onClick: () => void }) => {
  const { comments } = useNoteComments(note);

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex justify-center items-center text-xs font-semibold duration-200 text-gray-600 hover:text-gray-900"
      >
        <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
        <span>{comments.length}</span>
      </button>
    </>
  );
};
