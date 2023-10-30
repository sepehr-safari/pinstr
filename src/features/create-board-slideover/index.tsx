import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateBoard } from '@/shared/hooks/mutations';
import { capitalizeFirstLetter, joinClassNames } from '@/shared/utils';

import type { Board } from '@/shared/types';

import { CategoryFilterMenu, ImageSelector } from '@/features';

import { FORMATS } from './config';

export const CreateBoardSlideover = () => {
  const [tempBoard, setTempBoard] = useState<Partial<Board>>({});

  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get('action');

  const setBoardItem = (key: keyof Board, value: any) => {
    setTempBoard((board) => ({ ...board, [key]: value }));
  };

  const canSubmit = () =>
    tempBoard &&
    tempBoard.format != undefined &&
    tempBoard.category != undefined &&
    tempBoard.title != undefined &&
    tempBoard.description != undefined &&
    tempBoard.image != undefined;

  const { publishBoard, isLoading } = useMutateBoard();

  return (
    <Transition.Root show={action === 'create-board'} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setTempBoard({});

          setSearchParams(
            (searchParams) => {
              searchParams.delete('action');

              return searchParams;
            },
            { replace: true }
          );
        }}
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
                            {tempBoard.format == undefined ? (
                              <span>Create a new board</span>
                            ) : (
                              <span>{tempBoard.format}</span>
                            )}
                          </Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-gray-300">
                            {tempBoard.format == undefined ? (
                              <span>Get started by choosing a board type.</span>
                            ) : (
                              <span>Fill in the details below to create your desired board.</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {tempBoard.format == undefined ? (
                        <div className="p-6">
                          <ul role="list" className="grid grid-cols-1 gap-6">
                            {FORMATS.map((item) => (
                              <li key={item.title} className="flow-root">
                                <div className="relative group -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
                                  <div
                                    className={joinClassNames(
                                      item.background,
                                      'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
                                    )}
                                  >
                                    <item.icon
                                      className="h-6 w-6 text-white duration-300 ease-in-out group-hover:w-8 group-hover:h-8"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                      <div
                                        onClick={() => {
                                          setBoardItem('headers', item.headers);
                                          setBoardItem('format', item.headers[0].split(':')[0]);
                                        }}
                                      >
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <span>{item.title}</span>
                                      </div>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-4 pb-4 pt-4">
                              <div>
                                <label htmlFor="title" className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                      Title
                                    </span>
                                    <span className="text-xs ml-auto">{`(Required)`}</span>
                                  </div>
                                  <span className="text-xs font-light text-gray-500">
                                    Choose a fancy title for your board.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="off"
                                    autoFocus
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={tempBoard.title}
                                    onChange={(e) => setBoardItem('title', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="description" className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                      Description
                                    </span>
                                    <span className="text-xs ml-auto">{`(Required)`}</span>
                                  </div>
                                  <span className="text-xs font-light text-gray-500">
                                    Explain what this board is about in a few words.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={tempBoard.description}
                                    onChange={(e) => setBoardItem('description', e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <span className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                      Category
                                    </span>
                                    <span className="text-xs ml-auto">{`(Required)`}</span>
                                  </div>
                                  <span className="text-xs font-light text-gray-500">
                                    Choose a suitable category for your board.
                                  </span>
                                </span>
                                <div className="mt-2">
                                  <CategoryFilterMenu
                                    selected={tempBoard.category}
                                    setSelected={(value) => setBoardItem('category', value.title)}
                                    hideFirstOption
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="tags" className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                      Tags
                                    </span>
                                    <span className="text-xs ml-auto">{`(Optional)`}</span>
                                  </div>
                                  <span className="text-xs font-light text-gray-500">
                                    Add a few space separated tags to help people find your board
                                    easier.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={tempBoard.tags?.join(' ')}
                                    onChange={(event) =>
                                      setBoardItem(
                                        'tags',
                                        event.target.value
                                          ? event.target.value
                                              .split(' ')
                                              .filter((t, i, a) => a.indexOf(t) === i)
                                              .map(capitalizeFirstLetter)
                                          : []
                                      )
                                    }
                                  />
                                </div>

                                {tempBoard.tags && tempBoard.tags.length > 0 && (
                                  <div className="mt-2 flex gap-2 flex-wrap">
                                    {tempBoard.tags.map((tag, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div>
                                <span className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium leading-6 text-gray-900">
                                      Cover Image
                                    </span>
                                    <span className="text-xs ml-auto">{`(Required)`}</span>
                                  </div>
                                  <span className="text-xs font-light text-gray-500">
                                    Select an option and choose a high quality image that represents
                                    your board.
                                  </span>
                                </span>
                                <div className="mt-2">
                                  <ImageSelector
                                    image={tempBoard.image}
                                    setImage={(value) => setBoardItem('image', value)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-shrink-0 justify-between px-4 py-4">
                      <div>
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => {
                            setTempBoard({});

                            setSearchParams(
                              (searchParams) => {
                                searchParams.delete('action');

                                return searchParams;
                              },
                              {
                                replace: true,
                              }
                            );
                          }}
                        >
                          Cancel
                        </button>
                      </div>

                      {tempBoard.format != undefined && (
                        <div className="flex">
                          {
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setBoardItem('headers', undefined);
                                  setBoardItem('format', undefined);
                                }}
                                className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                <span aria-hidden="true">&larr;</span>
                                <span className="ml-2">Back</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => publishBoard(tempBoard, () => setTempBoard({}))}
                                className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:bg-gray-300 disabled:hover:opacity-100"
                                disabled={!canSubmit || isLoading}
                              >
                                Create Board
                              </button>
                            </>
                          }
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
