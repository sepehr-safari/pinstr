'use client';

import {
  FolderIcon,
  PaperClipIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { useParams } from 'next/navigation';

import { useAddPin } from '@/hooks';

// [TODO]: use dynamic form handler

const MyBoard = () => {
  const params = useParams();
  const board = params ? decodeURIComponent(params.board) : undefined;

  const inputTitleRef = useRef<HTMLInputElement>(null);
  // const title = inputTitleRef.current?.value;

  const { addPin } = useAddPin(board);

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-lg bg-base-200 border-[1px] border-neutral p-8 gap-2 flex flex-col">
          <div className="flex gap-2 items-start">
            <FolderIcon className="w-6 h-6 " />
            <p className="text-lg font-bold">{board}</p>
          </div>

          <p className="text-xs">Let's pin on this board!</p>

          <hr className="my-4 border-neutral" />

          <p className="text-sm">Title:</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm bg-neutral text-neutral-content"
            ref={inputTitleRef}
          />

          <div className="flex gap-2 items-center mt-4">
            <label className="w-4 h-4" htmlFor="new-property">
              <PlusIcon />
            </label>
            <input
              id="new-property"
              type="text"
              placeholder="New Property"
              autoComplete="off"
              className="bg-transparent border-b-[1px] border-neutral outline-none text-sm text-neutral-content w-28"
            />
          </div>

          <hr className="my-4 border-neutral" />

          <button
            className="btn btn-primary ml-auto gap-2"
            onClick={() => addPin(new Map())}
          >
            <div className="w-5 h-5 inline-block">
              <PaperClipIcon />
            </div>
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
