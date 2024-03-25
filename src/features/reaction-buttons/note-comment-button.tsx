import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useEffect, useState } from 'react';

export const NoteCommentButton = ({ note, onClick }: { note: NDKEvent; onClick: () => void }) => {
  const [comments, setComments] = useState<NDKEvent[]>([]);

  const { ndk } = useNdk();

  useEffect(() => {
    ndk.fetchEvents([{ kinds: [1], limit: 100, '#e': [note.id] }]).then((events) => {
      setComments([...events]);
    });
  }, [ndk, setComments, note.id]);

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
