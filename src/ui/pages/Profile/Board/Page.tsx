import { NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBoard } from '@/logic/queries';
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

  const { npub, title } = useParams();
  const ndkUser = npub ? new NDKUser({ npub }) : undefined;
  const author = ndkUser?.pubkey;

  const board = useBoard({ author, title });

  useEffect(() => {
    setOpenDetails(pinIndex > -1);
  }, [pinIndex]);

  if (board == undefined) {
    return (
      <div className="h-32 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (board == null) {
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
        onClose={() => {
          setOpenDetails(false);
          setPinIndex(-1);
        }}
      />
    </>
  );
};
