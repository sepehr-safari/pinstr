import { useEffect, useState } from 'react';

import { useBoards } from '@/logic/queries';
import { Format } from '@/logic/types';

import { Spinner } from '@/ui/components';
import {
  ImageGrid,
  LinkGrid,
  NoteGrid,
  ProfileGrid,
  TextGrid,
  VideoGrid,
} from '@/ui/components/Grids';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const Page = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [pinIndex, setPinIndex] = useState<number>(-1);

  useEffect(() => {
    setOpenDetails(pinIndex > -1);
  }, [pinIndex]);

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
      {board.format == Format.Text && <TextGrid board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Link && <LinkGrid board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Image && <ImageGrid board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Video && <VideoGrid board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Profile && <ProfileGrid board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Note && <NoteGrid board={board} setPinIndex={setPinIndex} />}

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        setPinIndex={setPinIndex}
        isOpen={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </>
  );
};
