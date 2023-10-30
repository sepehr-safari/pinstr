import { NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useBoard } from '@/shared/hooks/queries';

import { Format } from '@/shared/types';

import { Spinner } from '@/shared/components';

import {
  ImagePinItem,
  LinkPinItem,
  NotePinItem,
  ProfilePinItem,
  TextPinItem,
  VideoPinItem,
  DetailsSlideover,
} from '@/features';

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
      {board.format == Format.Text && <TextPinItem board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Link && <LinkPinItem board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Image && <ImagePinItem board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Video && <VideoPinItem board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Profile && <ProfilePinItem board={board} setPinIndex={setPinIndex} />}
      {board.format == Format.Note && <NotePinItem board={board} setPinIndex={setPinIndex} />}

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
