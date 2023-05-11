'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

import { useInsertHeader } from '@/hooks';

type Params = {
  currentBoard: Board | undefined;
  invalidate: () => void;
};

const NewHeaderInput = ({ currentBoard, invalidate }: Params) => {
  const [input, setInput] = useState('');

  const { insertHeader } = useInsertHeader();

  const handleOnChange = useCallback((e: any) => setInput(e.target.value), []);

  const handleOnKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        currentBoard && insertHeader(input, currentBoard, invalidate);
        setInput('');
      }
    },
    [insertHeader, input, currentBoard, invalidate]
  );

  const handleOnClick = useCallback(() => {
    currentBoard && insertHeader(input, currentBoard, invalidate);
    setInput('');
  }, [insertHeader, input, currentBoard, invalidate]);

  return (
    <>
      <div className="flex gap-2 items-center mt-4">
        <input
          type="text"
          autoComplete="off"
          className="bg-transparent border-b-[1px] border-neutral outline-none text-sm text-neutral-content w-52"
          placeholder="Add a new label (e.g. Director)"
          value={input}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
        <button
          className={`btn btn-xs btn-square ${input ? null : 'hidden'}`}
          onClick={handleOnClick}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default NewHeaderInput;
