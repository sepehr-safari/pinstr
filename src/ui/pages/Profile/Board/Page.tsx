import { useBoards } from '@/logic/queries';

import { Spinner } from '@/ui/components';
import {
  ImageGrid,
  LinkGrid,
  NoteGrid,
  ProfileGrid,
  TextGrid,
  VideoGrid,
} from '@/ui/components/Grids';

export const Page = () => {
  const { data: boards, status } = useBoards();
  const board = boards?.[0];

  if (status == 'loading') {
    return (
      <div className="h-32 flex justify-center items-center">
        <Spinner />
      </div>
    );
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
