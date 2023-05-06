'use client';

import { useBoards } from '@/hooks';

const My = () => {
  const { boards, eose } = useBoards();

  if (Object.keys(boards).length === 0) {
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
      <p>Hello 👋</p>

      <label
        htmlFor="boards-drawer"
        className="btn btn-primary btn-sm lg:hidden"
      >
        Create a new board
      </label>
    </>
  );
};

export default My;
