'use client';

import { usePubkey } from 'nostr-hooks';

import { useBoards, useContacts, useCurrentParams } from '@/hooks';

import { BoardCard, NoBoards } from '@/components';

const FrensBoard = () => {
  const pubkey = usePubkey();
  const { events } = useContacts({ pubkey });
  const { boardName } = useCurrentParams();

  const { boards, eose, loadMore } = useBoards({
    boardName,
    pubkeys:
      events && events.length > 0
        ? events[0].tags.filter((tag) => tag[0] === 'p').map((tag) => tag[1])
        : undefined,
    enabled: events && events.length > 0 && events[0].tags.length > 0,
    autoInvalidate: true,
  });

  if (boards.length === 0) {
    if (eose) {
      return <NoBoards />;
    } else {
      return (
        <>
          <button className="loading btn-sm btn btn-wide" />
        </>
      );
    }
  }

  return (
    <>
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

      <button className="btn btn-wide" onClick={loadMore}>
        Load More
      </button>
    </>
  );
};

export default FrensBoard;
