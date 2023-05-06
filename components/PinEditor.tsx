'use client';

import {
  FolderIcon,
  PaperClipIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

import { useAddPin, useInsertHeader } from '@/hooks';
import { useCallback } from 'react';

const PinEditor = ({
  boardName,
  initialData,
  pinName,
}: {
  boardName: string | undefined;
  pinName?: string | undefined;
  initialData: PinEditorFormData;
}) => {
  const { addPin } = useAddPin();
  const { insertHeader } = useInsertHeader();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PinEditorFormData>();

  const onSubmit = useCallback(
    (data: PinEditorFormData) => {
      let name = '';
      let items = new Array<string>();

      Object.entries(data).forEach(([header, value]) => {
        if (header === 'Name') {
          name = value;
          return;
        } else if (value) {
          items.push(value);
        }
      });

      addPin(name, items);
    },
    [addPin]
  );

  return (
    <>
      <div className="w-full p-4 md:p-10 lg:w-3/4">
        <div className="rounded-lg bg-base-200 border-[1px] border-neutral p-8 gap-2 flex flex-col">
          <div className="flex gap-2 items-start">
            <FolderIcon className="w-6 h-6 " />
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
            {Object.entries(initialData).map(([header, item]) => (
              <div key={header} className="flex flex-col gap-2">
                <label htmlFor={header} className="text-xs">
                  {header}:
                </label>

                <input
                  className="input input-sm bg-neutral text-neutral-content"
                  type="text"
                  placeholder={header}
                  defaultValue={item}
                  autoComplete="off"
                  {...register(header, { required: header === 'Name' })}
                />

                {header === 'Name' && errors['Name']?.type === 'required' && (
                  <span className="text-warning text-sm">
                    Name is required!
                  </span>
                )}
              </div>
            ))}

            <div className="flex gap-2 items-center mt-4">
              <input
                type="text"
                className="bg-transparent border-b-[1px] border-neutral outline-none text-sm text-neutral-content w-28"
                placeholder="Add an item"
                autoComplete="off"
                {...register('newHeader')}
              />
              <button
                className={`btn btn-xs btn-square ${
                  watch('newHeader') ? null : 'hidden'
                }`}
                type="button"
                onClick={() => insertHeader(watch('newHeader'))}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </div>

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
