'use client';

import { nip19 } from 'nostr-tools';

import { useBoards, useCurrentParams } from '@/hooks';

import { BoardCard, NoBoards } from '@/components';

const ProfileBoard = () => {
  const { npub, boardName } = useCurrentParams();
  const pubkey = !!npub && nip19.decode(npub).data.toString();

  const { boards, eose } = useBoards({
    pubkeys: pubkey ? [pubkey] : undefined,
    boardName,
    enabled: !!pubkey && !!boardName,
    autoInvalidate: true,
  });

  if (boards.length === 0) {
    if (eose) {
      return <NoBoards />;
    } else {
      return (
        <>
          <span className="loading loading-bars loading-lg fixed top-1/2 left-1/2 z-50" />
        </>
      );
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {boards.length > 0
        ? boards.map((board) => {
            if (board.pins.length > 0) {
              return (
                <BoardCard
                  key={board.id}
                  boardAuthor={board.pubkey}
                  boardName={board.name}
                />
              );
            }
          })
        : null}
    </div>
  );
};

export default ProfileBoard;
