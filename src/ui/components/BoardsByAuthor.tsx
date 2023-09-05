import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useBoardsByAuthor } from '@/logic/queries';

import { MemoizedBoardItem, Spinner } from '@/ui/components';

export const BoardsByAuthor = () => {
  const { npub } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: boards, status } = useBoardsByAuthor({ author: hex });

  if (status == 'loading') {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto pb-16 overflow-hidden max-w-md sm:max-w-none">
      <div
        className={
          'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'
        }
      >
        {(boards || []).map((board) => (
          <MemoizedBoardItem key={board.id} board={board} hideAuthor />
        ))}
      </div>
    </div>
  );
};
