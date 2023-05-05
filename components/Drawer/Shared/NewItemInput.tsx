'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

import { useNewItemInput } from '@/hooks';

type NewItemInputParams = {
  inputId: string;
};

const NewItemInput = ({ inputId }: NewItemInputParams) => {
  const { handleOnChange, handleOnKeyDown, handlePublish, newBoardInput } =
    useNewItemInput();

  return (
    <>
      <div className="px-4 py-2 flex gap-2 items-center">
        <div className="w-5 h-5 inline-block">
          <PlusIcon />
        </div>
        <input
          id={inputId}
          type="text"
          placeholder="New board"
          autoComplete="off"
          className="input input-xs bg-neutral text-neutral-content w-full max-w-xs"
          value={newBoardInput}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onBlur={handlePublish}
        />
      </div>
    </>
  );
};

export default NewItemInput;
