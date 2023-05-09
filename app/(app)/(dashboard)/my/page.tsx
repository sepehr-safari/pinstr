'use client';

import { usePubkey } from 'nostr-hooks';

import { useBoards } from '@/hooks';

const My = () => {
  const pubkey = usePubkey();
  const { boards, eose } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });

  if (boards.length === 0) {
    if (eose) {
      return (
        <>
          <p>Hello 👋</p>
          <p>You have no boards!</p>

          <label
            htmlFor="boards-drawer"
            className="btn btn-primary btn-sm lg:hidden"
          >
            Create a new board
          </label>
        </>
      );
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
      <h3>Welcome</h3>
    </>
  );
};

export default My;
