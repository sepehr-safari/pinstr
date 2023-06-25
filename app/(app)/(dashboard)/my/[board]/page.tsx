'use client';

import { usePubkey } from 'nostr-hooks';

import { useBoards, useCurrentParams } from '@/hooks';

import { PinEditor } from '@/components';

const MyBoard = () => {
  const pubkey = usePubkey();
  const { boardName } = useCurrentParams();
  const { boards, eose } = useBoards({ pubkeys: [pubkey], enabled: !!pubkey });
  const currentBoard = boards.find((board) => board.name === boardName);

  if (!currentBoard) {
    if (eose) {
      if (boards.length > 0) {
        return (
          <>
            <h3>Board not found!</h3>
          </>
        );
      } else {
        return (
          <>
            <p>You have no boards!</p>

            <label
              htmlFor="boards-drawer"
              className="btn btn-primary btn-sm lg:hidden"
            >
              Create a new board
            </label>
          </>
        );
      }
    } else {
      return (
        <>
          <span className="loading loading-bars loading-lg fixed top-1/2 left-1/2 z-50" />
        </>
      );
    }
  }

  return (
    <>
      <PinEditor />
    </>
  );
};

export default MyBoard;
