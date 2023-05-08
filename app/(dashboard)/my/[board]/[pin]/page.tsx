'use client';

import { PinEditor } from '@/components';
import { useBoards, useCurrentParams } from '@/hooks';
import { usePubkey } from 'nostr-hooks';

const MyPin = () => {
  const pubkey = usePubkey();
  const { boardName, pinName } = useCurrentParams();
  const { boards, eose } = useBoards({ pubkey, enabled: !!pubkey });
  const currentBoard = boards.find((board) => board.name === boardName);
  const currentPin = currentBoard?.pins.find((pin) => pin[0] === pinName);

  if (!currentPin) {
    if (eose) {
      if (boards.length > 0) {
        if (currentBoard && currentBoard.pins.length > 0) {
          return (
            <>
              <h3>Pin not found!</h3>
            </>
          );
        } else {
          return (
            <>
              <h3>Board not found!</h3>
            </>
          );
        }
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
          <button className="loading btn-sm btn btn-wide" />
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

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyPin;
