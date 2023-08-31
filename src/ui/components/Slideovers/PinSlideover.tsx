import { Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateBoard } from '@/logic/mutations';
import { useBoardsByAuthor, useUser } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { loader } from '@/logic/utils';

import {
  ImagePinEditor,
  LinkPinEditor,
  NotePinEditor,
  ProfilePinEditor,
  TextPinEditor,
  VideoPinEditor,
} from '@/ui/components/PinEditors';

const SelectBoard = () => {
  const [searchInput, setSearchInput] = useState('');

  const { pubkey } = useUser();

  const { data: boards } = useBoardsByAuthor({ author: pubkey || undefined });

  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="">
        <div className="flex flex-1 items-center justify-center w-full border-b">
          <div className="w-full px-8 py-4">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                type="search"
                id="search"
                name="search"
                autoComplete="off"
                className="block w-full rounded-md border-0 bg-opacity-30 bg-white py-2 pl-10 pr-3 text-xs text-gray-900 ring-1 ring-inset ring-gray-900/20 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:bg-opacity-50"
                placeholder="Search in your boards"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
          </div>
        </div>
        <ul role="list" className="mt-4 px-6 grid grid-cols-2 gap-4">
          {(boards || [])
            .filter((board) => board.title.toLowerCase().includes(searchInput.toLowerCase()))
            .map((board) => (
              <li key={board.id} className="flow-root">
                <div className="relative group flex items-center gap-2 pr-2 rounded-xl focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-200">
                    <img
                      className="h-12 w-12 rounded-lg duration-300 ease-in-out group-hover:h-14 group-hover:w-14"
                      src={loader(board.image, {
                        w: 96,
                        h: 96,
                      })}
                      alt={board.title}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <div
                        onClick={() => {
                          setSearchParams(
                            (searchParams) => {
                              searchParams.set('i', board.pins.length.toString());
                              return searchParams;
                            },
                            { replace: true }
                          );

                          setBoard(board);
                        }}
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <span>{board.title}</span>
                      </div>
                    </h3>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export const PinSlideover = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');
  const pinIndex = searchParams.get('i');

  const setBoard = useLocalStore((store) => store.setBoard);
  const title = useLocalStore((store) => store.board.title);
  const type = useLocalStore((store) => store.board.type);

  const { removePin, publishBoard } = useMutateBoard();

  useEffect(() => {
    if (action === 'remove-pin' && pinIndex != null) {
      !removePin.isLoading && removePin.mutate();
    }
  }, [removePin, action, pinIndex]);

  return (
    <Transition.Root show={action === 'create-pin' || action === 'edit-pin'} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() =>
          setSearchParams(
            (searchParams) => {
              searchParams.delete('action');
              searchParams.delete('i');
              return searchParams;
            },
            { replace: true }
          )
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-gray-800 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            {action === 'create-pin' ? (
                              !title ? (
                                <span>Add a new pin</span>
                              ) : (
                                <span>Add a new pin to {title}</span>
                              )
                            ) : (
                              <span>Edit your pin</span>
                            )}
                          </Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-gray-300">
                            {!title ? (
                              <span>Get started by choosing a board.</span>
                            ) : action === 'create-pin' ? (
                              <span>Fill in the details below to add a new pin to your board.</span>
                            ) : (
                              <span>Edit the details below to update your pin.</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {!title ? (
                        <SelectBoard />
                      ) : (
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-4 pb-4 pt-4">
                              {type === 'Image' && <ImagePinEditor />}
                              {type === 'Video' && <VideoPinEditor />}
                              {type === 'Profile' && <ProfilePinEditor />}
                              {type === 'Note' && <NotePinEditor />}
                              {type === 'Link' && <LinkPinEditor />}
                              {type === 'Text' && <TextPinEditor />}

                              {action === 'edit-pin' && (
                                <div className="py-6">
                                  <div className="flex flex-col rounded-md border border-dashed border-red-300">
                                    <div className="w-full bg-red-50 shadow-inner px-4 py-2 border-b border-red-100 rounded-t-md">
                                      <span className="text-sm font-bold text-red-400">
                                        Danger Zone
                                      </span>
                                    </div>
                                    <div className="p-4 flex items-center">
                                      <div className="text-xs">
                                        Deleting a pin is permanent and cannot be undone.
                                      </div>
                                      <button
                                        type="button"
                                        className="ml-auto rounded-md border border-red-200 px-4 py-1 text-sm font-bold leading-6 text-red-400 hover:text-red-500 hover:border-red-300"
                                        onClick={() => {
                                          removePin.mutate();
                                        }}
                                      >
                                        Delete Pin
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-shrink-0 justify-between px-4 py-4">
                      <div>
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() =>
                            setSearchParams(
                              (searchParams) => {
                                searchParams.delete('action');
                                searchParams.delete('i');
                                return searchParams;
                              },
                              { replace: true }
                            )
                          }
                        >
                          Cancel
                        </button>
                      </div>

                      {title && (
                        <div className="flex">
                          {action === 'create-pin' ? (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchParams(
                                    (searchParams) => {
                                      searchParams.delete('i');
                                      return searchParams;
                                    },
                                    { replace: true }
                                  );

                                  setBoard({});
                                }}
                                className="flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                <span aria-hidden="true">&larr;</span>
                                <span className="ml-2">Back</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => publishBoard.mutate()}
                                className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              >
                                Add Pin
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => publishBoard.mutate()}
                              className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                              Update Pin
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
