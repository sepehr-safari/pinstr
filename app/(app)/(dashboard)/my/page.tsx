'use client';

import { usePubkey } from 'nostr-hooks';
import { useEffect } from 'react';

import { useBoards } from '@/hooks';

import { toggleDrawer } from '@/utils';

const My = () => {
  const pubkey = usePubkey();
  const { boards, eose } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
    autoInvalidate: true,
  });

  useEffect(() => {
    toggleDrawer('boards-drawer', true);
  }, []);

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
