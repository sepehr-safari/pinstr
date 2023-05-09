'use client';

import { useBoards } from '@/hooks';

import BoardCard from '@/components/BoardCard';
import { usePubkey } from 'nostr-hooks';
import useContacts from '@/hooks/sub/useContacts';

const Feed = () => {
  const pubkey = usePubkey();
  const { events } = useContacts({ pubkey });

  const { boards } = useBoards({
    pubkeys:
      events && events.length > 0
        ? events[0].tags.map((tag) => tag[1])
        : undefined,
    enabled: events && events.length > 0 && events[0].tags.length > 0,
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

export default Feed;
