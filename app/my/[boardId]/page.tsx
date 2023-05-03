'use client';

import { useBoards, usePins } from '@/hooks';
import { useParams } from 'next/navigation';

const MyBoard = () => {
  const params = useParams();
  const boardId = params ? params?.boardId : undefined;
  const { pins, eose } = usePins(boardId);
  const { boards } = useBoards();
  const boardName = boards.find((board) => board.id === boardId)?.name;

  return (
    <>
      <div className="rounded-sm border-[1px] border-neutral-600 p-2">
        <p className="text-lg font-bold">{boardName}</p>

        {!pins.length && eose && (
          <p className="text-xs">Let's create first pin for this board!</p>
        )}

        <hr className="my-2 border-neutral-600" />
      </div>
    </>
  );
};

// (!pins.length && eose) && no pins

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyBoard;
