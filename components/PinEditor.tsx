'use client';

import { FolderIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { usePubkey } from 'nostr-hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useAddPin, useBoards, useCurrentParams } from '@/hooks';

import { NewHeaderInput } from '@/components';

const PinEditor = () => {
  const pubkey = usePubkey();
  const { boardName, pinName } = useCurrentParams();
  const { boards, invalidate } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });
  const currentBoard = boards.find((board) => board.name === boardName);

  const { addPin } = useAddPin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PinEditorFormData>();

  const onSubmit = useCallback(
    (data: PinEditorFormData) => {
      if (!currentBoard) return;

      addPin(Object.values(data), currentBoard, invalidate);
    },
    [addPin, currentBoard, invalidate]
  );

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-lg bg-base-200 border-[1px] border-neutral p-8 gap-2 flex flex-col">
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6">
              <FolderIcon />
            </div>
            <p className="text-lg font-bold">{boardName}</p>
          </div>

          {pinName ? (
            <p className="text-xs">Let's edit this pin!</p>
          ) : (
            <p className="text-xs">Let's pin on this board!</p>
          )}

          <hr className="my-4 border-neutral" />

          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            {currentBoard &&
              currentBoard.headers.map((header, index) => (
                <div key={header} className="flex flex-col gap-2">
                  <label htmlFor={header} className="text-xs">
                    {header}:
                  </label>

                  <input
                    className="input input-sm bg-neutral text-neutral-content"
                    type="text"
                    placeholder={
                      header === 'Name'
                        ? 'Enter Name (e.g. The Godfather)'
                        : `Enter a value for ${header}`
                    }
                    defaultValue={
                      currentBoard.pins.find((pin) => pin[0] === pinName)?.[
                        index
                      ] || ''
                    }
                    autoComplete="off"
                    {...register(`${index}_${header}`, {
                      required: header === 'Name',
                    })}
                  />

                  {header === 'Name' && errors['Name']?.type === 'required' && (
                    <span className="text-warning text-sm">
                      Name is required!
                    </span>
                  )}
                </div>
              ))}

            <NewHeaderInput
              currentBoard={currentBoard}
              invalidate={invalidate}
            />

            <hr className="my-4 border-neutral" />

            <button className="btn btn-primary ml-auto gap-2" type="submit">
              <div className="w-5 h-5 inline-block">
                <PaperClipIcon />
              </div>
              Pin it!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default PinEditor;
