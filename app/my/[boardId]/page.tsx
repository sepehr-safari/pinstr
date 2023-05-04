'use client';

import { useParams } from 'next/navigation';
import { usePublish } from 'nostr-hooks';
import { useCallback, useRef } from 'react';

import { useBoards } from '@/hooks';

const MyBoard = () => {
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const boardId = params ? params?.boardId : undefined;
  // const { pins, eose } = usePins(boardId);
  const { boards, invalidate } = useBoards();
  const boardName = boards.find((board) => board.id === boardId)?.name;

  const publish = usePublish(['wss://nos.lol']);

  const publishPin = useCallback(() => {
    const title = inputTitleRef.current?.value;

    if (!title || !boardName) {
      return;
    }

    publish({
      // @ts-ignore
      kind: 33888,
      tags: [
        ['d', boardName],
        ['headers', 'Title'],
        ['pin', title],
      ],
    }).then(invalidate);
  }, [invalidate, publish, boardName]);

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-sm bg-base-200 border-[1px] border-neutral-600 p-8 gap-2 flex flex-col">
          <p className="text-lg font-bold">{boardName}</p>

          <p className="text-xs">Let's pin on this board!</p>

          <hr className="my-4 border-neutral-600" />

          <p className="text-sm">Title:</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm bg-neutral text-neutral-content"
            ref={inputTitleRef}
          />

          <hr className="my-4 border-neutral-600" />

          <button
            className="btn btn-primary ml-auto gap-2"
            onClick={publishPin}
          >
            Pin it!
          </button>
        </div>
      </div>
    </>
  );
};

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyBoard;
