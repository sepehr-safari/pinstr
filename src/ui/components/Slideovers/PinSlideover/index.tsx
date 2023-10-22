import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useRemovePinParams } from '@/logic/hooks';
import { useMutateBoard } from '@/logic/mutations';

import { useBoard, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { InsertFeaturePopover } from '@/ui/components/Popovers';
import { Spinner } from '../..';
import { PinEditor } from './PinEditor';
import { SelectBoard } from './SelectBoard';

const PRESERVED_TITLES = ['Content', 'Title', 'Image'];

export const PinSlideover = () => {
  const [tempBoard, setTempBoard] = useState<Partial<Board | undefined>>(undefined);
  const [featureTitleInput, setFeatureTitleInput] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');
  const title = searchParams.get('title');
  const pinIndex = searchParams.get('i');
  const confirm = searchParams.get('confirm');
  const insertFeature = searchParams.get('insert-feature');
  const reorderFeatures = searchParams.get('reorder-features');

  const { pubkey } = useUser();
  const board = useBoard({ author: pubkey ?? undefined, title: title ?? undefined });

  const setBoardItem = (key: keyof Board, value: any) => {
    setTempBoard((board) => ({ ...board, [key]: value }));
  };

  useEffect(() => {
    if (!tempBoard && !!board) {
      setTempBoard(board);
    }
  }, [board, tempBoard, setTempBoard]);

  const { removePin, publishBoard, isLoading } = useMutateBoard();

  const { setRemovePinParams } = useRemovePinParams(
    tempBoard,
    pinIndex != null ? +pinIndex : undefined
  );

  const canSubmit = useMemo(() => {
    if (!tempBoard || !tempBoard.headers || !tempBoard.pins || pinIndex == null) {
      return false;
    }

    return tempBoard.headers.every((header, hIndex) => {
      const title = header.split(':')[1];

      if (PRESERVED_TITLES.includes(title) == false) {
        return true;
      }

      return (
        tempBoard.pins != undefined &&
        tempBoard.pins.length > +pinIndex &&
        tempBoard.pins[+pinIndex][hIndex] != undefined &&
        tempBoard.pins[+pinIndex][hIndex] != ''
      );
    });
  }, [tempBoard?.headers, tempBoard?.pins, pinIndex]);

  useEffect(() => {
    if (board && action === 'remove-pin' && pinIndex != null && confirm === 'true') {
      !isLoading && removePin(board, pinIndex);
    }
  }, [removePin, action, pinIndex, confirm, isLoading, board]);

  useEffect(() => {
    let focusTimeout: number;

    if (insertFeature) {
      focusTimeout = setTimeout(() => document.getElementById('feature-title')?.focus(), 200);
    }

    return () => {
      clearTimeout(focusTimeout);
    };
  }, [insertFeature]);

  return (
    <Transition.Root show={action === 'create-pin' || action === 'edit-pin'} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() =>
          setSearchParams(
            (searchParams) => {
              searchParams.delete('action');
              searchParams.delete('title');
              searchParams.delete('i');
              searchParams.delete('confirm');
              searchParams.delete('insert-feature');
              searchParams.delete('reorder-features');

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
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl overflow-hidden">
                    {board == undefined ? (
                      <div className="h-full w-full flex justify-center items-center">
                        <Spinner />
                      </div>
                    ) : board == null || tempBoard == undefined ? (
                      <>
                        <div>Board Not Found!</div>
                      </>
                    ) : (
                      <>
                        <div className="h-0 flex-1 overflow-y-auto">
                          <div className="bg-gray-800 px-4 py-6 sm:px-6">
                            <div className="flex items-center justify-between">
                              <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                {action === 'create-pin' ? (
                                  !tempBoard.title ? (
                                    <span>Add a new pin</span>
                                  ) : (
                                    <span>Add a new pin to {tempBoard.title}</span>
                                  )
                                ) : (
                                  <span>Edit your pin</span>
                                )}
                              </Dialog.Title>
                            </div>
                            <div className="mt-1">
                              <p className="text-sm font-light text-gray-300">
                                {!tempBoard.title ? (
                                  <span>Get started by choosing a board.</span>
                                ) : action === 'create-pin' ? (
                                  <span>
                                    Fill in the details below to add a new pin to your board.
                                  </span>
                                ) : (
                                  <span>Edit the details below to update your pin.</span>
                                )}
                              </p>
                            </div>
                          </div>

                          {!tempBoard.title ? (
                            <SelectBoard />
                          ) : (
                            <div className="flex flex-1 flex-col justify-between">
                              <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                <div className="space-y-4 pb-4 pt-4">
                                  {!!board && (
                                    <PinEditor board={board} setBoardItem={setBoardItem} />
                                  )}

                                  {action === 'edit-pin' && (
                                    <div className="flex flex-col rounded-md border border-dashed border-red-300">
                                      <div className="w-full bg-red-50 shadow-inner px-4 py-6 border-b border-red-100 rounded-t-md">
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
                                          className="ml-auto shrink-0 rounded-md border border-red-500 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50"
                                          onClick={setRemovePinParams}
                                        >
                                          Delete Pin
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="w-full relative h-10">
                            <Transition
                              show={
                                insertFeature == null &&
                                reorderFeatures == null &&
                                !!tempBoard.title
                              }
                              enter="duration-100"
                              enterFrom="opacity-0 translate-x-1/4"
                              enterTo="opacity-100 translate-x-0"
                              leave="duration-100"
                              leaveFrom="opacity-100 translate-x-0"
                              leaveTo="opacity-0 translate-x-1/4"
                            >
                              <div className="absolute inset-0 flex justify-center">
                                <InsertFeaturePopover />

                                <div className="ml-auto ">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSearchParams(
                                        (searchParams) => {
                                          searchParams.set('reorder-features', 'show');
                                          return searchParams;
                                        },
                                        { replace: true }
                                      );
                                    }}
                                    className="inline-flex items-center rounded-full bg-gray-100 px-4 py-3 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-200 sm:py-3"
                                  >
                                    <ChevronUpDownIcon className="-ml-1 mr-3 h-5 w-5 hidden sm:block" />
                                    Reorder Features
                                  </button>
                                </div>
                              </div>
                            </Transition>

                            <Transition
                              show={insertFeature != null || reorderFeatures != null}
                              enter="duration-100"
                              enterFrom="opacity-0 -translate-x-1/4"
                              enterTo="opacity-100 translate-x-0"
                              leave="duration-100"
                              leaveFrom="opacity-100 translate-x-0"
                              leaveTo="opacity-0 -translate-x-1/4"
                            >
                              <div className="w-full flex gap-2 h-10">
                                {insertFeature && (
                                  <>
                                    <input
                                      type="text"
                                      name="feature-title"
                                      id="feature-title"
                                      autoComplete="off"
                                      className="block w-full rounded-full border-0 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                      placeholder="Enter a title"
                                      value={featureTitleInput}
                                      onChange={(e) => setFeatureTitleInput(e.target.value)}
                                    />

                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
                                      onClick={() => {
                                        if (
                                          !featureTitleInput ||
                                          PRESERVED_TITLES.includes(featureTitleInput) ||
                                          tempBoard.headers
                                            ?.map((h) => h.split(':')[1])
                                            .includes(featureTitleInput)
                                        ) {
                                          toast('Invalid title! Try a unique one!', {
                                            type: 'error',
                                          });

                                          return;
                                        }

                                        setBoardItem('headers', [
                                          ...(tempBoard.headers || []),
                                          `${insertFeature}:${featureTitleInput}`,
                                        ]);

                                        setBoardItem(
                                          'pins',
                                          tempBoard.pins?.map((pin) => [...pin, ''])
                                        );

                                        setSearchParams(
                                          (searchParams) => {
                                            searchParams.delete('insert-feature');
                                            return searchParams;
                                          },
                                          { replace: true }
                                        );

                                        setFeatureTitleInput('');
                                      }}
                                    >
                                      Insert
                                    </button>

                                    <button
                                      type="button"
                                      className="inline-flex items-center rounded-full bg-gray-50 p-4 text-xs font-semibold text-gray-500 shadow-sm hover:bg-gray-100"
                                      onClick={() =>
                                        setSearchParams(
                                          (searchParams) => {
                                            searchParams.delete('insert-feature');
                                            return searchParams;
                                          },
                                          { replace: true }
                                        )
                                      }
                                    >
                                      <XMarkIcon className="w-4 h-4" />
                                    </button>
                                  </>
                                )}

                                {reorderFeatures && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => publishBoard(tempBoard)}
                                      className="ml-auto inline-flex items-center rounded-full bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 sm:py-3"
                                    >
                                      <CheckIcon className="-ml-1 mr-3 h-6 w-6 hidden sm:block" />
                                      Update board
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSearchParams(
                                          (searchParams) => {
                                            searchParams.delete('reorder-features');
                                            return searchParams;
                                          },
                                          { replace: true }
                                        );
                                      }}
                                      className="inline-flex p-2 rounded-full bg-gray-100 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-200 sm:p-3"
                                    >
                                      <XMarkIcon className="w-5 h-5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </Transition>
                          </div>
                        </div>

                        <div className="flex flex-shrink-0 justify-between px-4 py-4">
                          <div>
                            <button
                              type="button"
                              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              onClick={() =>
                                setSearchParams(
                                  (searchParams) => {
                                    searchParams.delete('action');
                                    searchParams.delete('i');
                                    searchParams.delete('confirm');
                                    searchParams.delete('insert-feature');
                                    searchParams.delete('reorder-features');

                                    return searchParams;
                                  },
                                  { replace: true }
                                )
                              }
                            >
                              Cancel
                            </button>
                          </div>

                          {tempBoard.title && (
                            <div className="flex">
                              {action === 'create-pin' ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSearchParams(
                                        (searchParams) => {
                                          searchParams.delete('title');
                                          searchParams.delete('i');
                                          searchParams.delete('insert-feature');
                                          searchParams.delete('reorder-features');

                                          return searchParams;
                                        },
                                        { replace: true }
                                      );
                                    }}
                                    className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    <span aria-hidden="true">&larr;</span>
                                    <span className="ml-2">Back</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => publishBoard(tempBoard)}
                                    className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:bg-gray-300 disabled:hover:opacity-100"
                                    disabled={!canSubmit || isLoading}
                                  >
                                    Add Pin
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => publishBoard(tempBoard)}
                                  className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:bg-gray-300 disabled:hover:opacity-100"
                                  disabled={!canSubmit || isLoading}
                                >
                                  Update Pin
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
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
