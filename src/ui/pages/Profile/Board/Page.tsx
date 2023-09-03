import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';
import { useBoard } from '@/logic/queries';
import { joinClassNames } from '@/logic/utils';

import {
  ImageGrid,
  LinkGrid,
  NoteGrid,
  ProfileGrid,
  TextGrid,
  VideoGrid,
} from '@/ui/components/Grids';

export const Page = () => {
  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: board, status } = useBoard({ author: hex, title: title });

  const { commentsParam } = useCommentsParams();

  if (status == 'loading') {
    return <div>Loading ...</div>;
  }

  if (!board) {
    return <div>Board not found!</div>;
  }

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          commentsParam == null
            ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6'
            : 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5'
        )}
      >
        {board.type == 'Text' && <TextGrid board={board} />}
        {board.type == 'Link' && <LinkGrid board={board} />}
        {board.type == 'Image' && <ImageGrid board={board} />}
        {board.type == 'Video' && <VideoGrid board={board} />}
        {board.type == 'Profile' && <ProfileGrid board={board} />}
        {board.type == 'Note' && <NoteGrid board={board} />}
      </ul>
    </>
  );
};
