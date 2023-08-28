import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { MemoizedBoardItem } from '@/components';
import { useBoardsByAuthor } from '@/queries';

export const BoardsInProfile = () => {
  const { npub } = useParams();
  const hex = nip19.decode(npub!).data.toString();

  const { data: boards } = useBoardsByAuthor({ author: hex });

  return (
    <div className="mx-auto pb-16 overflow-hidden max-w-md sm:max-w-none">
      <div
        className={
          'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'
        }
      >
        {(boards || []).map((board) => (
          <MemoizedBoardItem key={board.id} board={board} hideAuthor={true} />
        ))}
      </div>
    </div>
  );
};
