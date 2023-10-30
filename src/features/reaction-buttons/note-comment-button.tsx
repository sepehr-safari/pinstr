import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';

import { useNoteComments } from '@/shared/hooks/queries';

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
