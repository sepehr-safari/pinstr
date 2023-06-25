'use client';

import { FolderIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { usePubkey } from 'nostr-hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useAddPin, useBoards, useCurrentParams, useSetAvatar } from '@/hooks';

import { NewHeaderInput } from '@/components';
import Upload from './Upload';

const PinEditor = () => {
  const pubkey = usePubkey();
  const { boardName, pinName } = useCurrentParams();
  const { boards, invalidate } = useBoards({
    pubkeys: [pubkey],
    enabled: !!pubkey,
  });
  const currentBoard = boards.find((board) => board.name === boardName);

  const { addPin } = useAddPin();
  const { setAvatar } = useSetAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SimpleFormData>();

  const onSubmit = useCallback(
    (data: SimpleFormData) => {
      if (!currentBoard) return;

      addPin(Object.values(data), currentBoard, invalidate);
    },
    [addPin, currentBoard, invalidate]
  );

  const handleUploadAvatar = useCallback(
    (url: string) => {
      console.log('handleUploadAvatar', currentBoard);

      if (!currentBoard) return;

      console.log('currentBoard', currentBoard);

      setAvatar(url, currentBoard, invalidate);
    },
    [setAvatar, currentBoard, invalidate]
  );

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-lg bg-base-200 border-2 border-neutral p-8 gap-2 flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6">
                  <FolderIcon className="w-6 h-6" />
                </div>
                <p className="text-lg font-bold">{boardName}</p>
              </div>

              {pinName ? (
                <>
                  <div className="flex gap-2 items-start ml-5">
                    <div className="w-5 h-5">
                      <PaperClipIcon className="w-5 h-5" />
                    </div>
                    <p className="">{pinName}</p>
                  </div>

                  <p className="text-xs">Let's edit this pin!</p>
                </>
              ) : (
                <p className="text-xs">Let's pin on this board!</p>
              )}
            </div>

            <Upload onSuccess={handleUploadAvatar}>
              <div className="w-14 h-14 border-2 border-neutral text-xs text-center cursor-pointer">
                {currentBoard && !!currentBoard.avatar ? (
                  <div className="avatar">
                    <div className="w-full">
                      <img src={currentBoard.avatar} />
                    </div>
                  </div>
                ) : (
                  <>Upload</>
                )}
              </div>
            </Upload>
          </div>

          <hr className="my-4 border-neutral border-2" />

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

            <Upload />

            <hr className="my-4 border-neutral border-2" />

            <button className="btn btn-primary ml-auto gap-2" type="submit">
              <div className="w-5 h-5 inline-block">
                <PaperClipIcon className="w-5 h-5" />
              </div>
              Pin it!
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PinEditor;
