import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useBoard } from '@/logic/queries';

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
      {board.type == 'Text' && <TextGrid board={board} />}
      {board.type == 'Link' && <LinkGrid board={board} />}
      {board.type == 'Image' && <ImageGrid board={board} />}
      {board.type == 'Video' && <VideoGrid board={board} />}
      {board.type == 'Profile' && <ProfileGrid board={board} />}
      {board.type == 'Note' && <NoteGrid board={board} />}
    </>
  );
};
