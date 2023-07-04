'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { usePubkey } from 'nostr-hooks';
import { useCallback, useState } from 'react';

import { useAddBoard, useBoards } from '@/hooks';

type NewItemInputParams = {
  inputId: string;
};

const NewItemInput = ({ inputId }: NewItemInputParams) => {
  const router = useRouter();
  const [newBoardInput, setNewBoardInput] = useState('');

  const pubkey = usePubkey();
  const { invalidate } = useBoards({ pubkeys: [pubkey], enabled: !!pubkey });

  const { addBoard } = useAddBoard();

  const handleOnChange = useCallback(
    (e: any) => setNewBoardInput(e.target.value),
    []
  );

  const handleOnKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        addBoard(newBoardInput, invalidate);
        setNewBoardInput('');
        router.push(`/my/${encodeURIComponent(newBoardInput)}`);
      }
    },
    [addBoard, newBoardInput]
  );

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
        />
      </div>
    </>
  );
};

export default NewItemInput;
