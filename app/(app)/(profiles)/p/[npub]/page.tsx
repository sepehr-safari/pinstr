'use client';

import { nip19 } from 'nostr-tools';

import { useBoards, useCurrentParams } from '@/hooks';

import { BoardCard } from '@/components';

const Profile = () => {
  const { npub } = useCurrentParams();
  const pubkey = npub && nip19.decode(npub).data.toString();

  const { boards } = useBoards({
    pubkeys: pubkey ? [pubkey] : undefined,
    enabled: !!pubkey,
    autoInvalidate: true,
  });

  return (
    <>
      {boards.length > 0
        ? boards.map((board) => {
            if (board.pins.length > 0) {
              return (
                <BoardCard
                  key={board.id}
                  pubkey={board.pubkey}
                  boardName={board.name}
                />
              );
            }
          })
        : null}
    </>
  );
};

export default Profile;
