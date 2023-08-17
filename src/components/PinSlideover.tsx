import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { CategoryMenu, CoverImageMenu } from '@/components/Menus';
import { useMutateBoard } from '@/hooks';
import { boards } from './Boards'; // TODO: Replace with real data

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  initialState?: {
    id?: string;
    title?: string;
    description?: string;
    coverImageURL?: string;
    category?: string;
    boardType?: string;
    tags?: string[];
    pins?: string[][];
  };
};

export default function PinSlideover({ open, setOpen, initialState }: Props) {
  const {
    title,
    description,
    boardType,
    category,
    tags,
    coverImageURL,
    pins,
    publishBoard,
    updateBoard,
    deleteBoard,
  } = useMutateBoard({ onSuccess: () => setOpen(false), initialState });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-gray-800 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            {!initialState ? (
                              !title.value ? (
                                <span>Add a new pin</span>
                              ) : (
                                <span>Add a new pin to {title.value}</span>
                              )
                            ) : (
                              <span>Edit your pin</span>
                            )}
                          </Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-gray-300">
                            {!initialState ? (
                              !title.value ? (
                                <span>Get started by choosing a board.</span>
                              ) : (
                                <span>
                                  Fill in the details below to add a new pin to
                                  your board.
                                </span>
                              )
                            ) : (
                              <span>
                                Edit the details below to update your pin.
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {!title.value ? (
                        <div className="p-6">
                          <ul role="list" className="grid grid-cols-1 gap-6">
                            {boards.map((board) => (
                              <li key={board.id} className="flow-root">
                                <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
                                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
                                    <img
                                      className="h-8 w-8"
                                      src={board.image}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-sm font-medium text-gray-900">
                                      <div
                                        onClick={() => title.set(board.title)}
                                      >
                                        <span
                                          className="absolute inset-0"
                                          aria-hidden="true"
                                        />
                                        <span>{board.title}</span>
                                        <span aria-hidden="true"> &rarr;</span>
                                      </div>
                                    </h3>
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
                                <label
                                  htmlFor="title"
                                  className="flex flex-col"
                                >
                                  <span className="text-sm font-medium leading-6 text-gray-900">
                                    Title
                                  </span>
                                  <span className="text-xs font-light text-gray-500">
                                    Choose a nice title for your pin.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="off"
                                    autoFocus
                                    tabIndex={1}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={title.value}
                                    onChange={(e) => title.set(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="description"
                                  className="flex flex-col"
                                >
                                  <span className="text-sm font-medium leading-6 text-gray-900">
                                    Description
                                  </span>
                                  <span className="text-xs font-light text-gray-500">
                                    Explain what this board is about in a few
                                    words.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={description.value}
                                    onChange={(e) =>
                                      description.set(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div>
                                <span className="flex flex-col">
                                  <span className="text-sm font-medium leading-6 text-gray-900">
                                    Category
                                  </span>
                                  <span className="text-xs font-light text-gray-500">
                                    Choose a suitable category for your board.
                                  </span>
                                </span>
                                <div className="mt-2">
                                  <CategoryMenu
                                    selected={category.value}
                                    setSelected={category.set}
                                    hideFirstOption
                                  />
                                </div>
                              </div>
                              <div>
                                <label htmlFor="tags" className="flex flex-col">
                                  <span className="text-sm font-medium leading-6 text-gray-900">
                                    Tags
                                  </span>
                                  <span className="text-xs font-light text-gray-500">
                                    Add a few space separated tags to help
                                    people find your board easier.
                                  </span>
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    autoComplete="off"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                    value={tags.value.join(' ')}
                                    onChange={(event) =>
                                      tags.set(
                                        event.target.value
                                          ? event.target.value
                                              .split(' ')
                                              .filter(
                                                (t, i, a) => a.indexOf(t) === i
                                              )
                                          : []
                                      )
                                    }
                                  />
                                </div>

                                {tags.value.length > 0 && (
                                  <div className="mt-2 flex gap-2 flex-wrap">
                                    {tags.value.map((tag, index) => (
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
                                  <span className="text-sm font-medium leading-6 text-gray-900">
                                    Cover Image
                                  </span>
                                  <span className="text-xs font-light text-gray-500">
                                    Select an option and choose a high quality
                                    image that represents your board.
                                  </span>
                                </span>
                                <div className="mt-2">
                                  <CoverImageMenu
                                    coverImageURL={coverImageURL.value}
                                    setCoverImageURL={coverImageURL.set}
                                  />
                                </div>
                              </div>

                              {initialState && (
                                <div className="py-6">
                                  <div className="flex flex-col rounded-md border border-dashed border-red-300">
                                    <div className="w-full bg-red-50 shadow-inner px-4 py-2 border-b border-red-100 rounded-t-md">
                                      <span className="text-sm font-bold text-red-400">
                                        Danger Zone
                                      </span>
                                    </div>
                                    <div className="p-4 flex items-center">
                                      <div className="text-xs">
                                        Deleting a board is permanent and cannot
                                        be undone.
                                      </div>
                                      <button
                                        type="button"
                                        className="ml-auto rounded-md border border-red-200 px-4 py-1 text-sm font-bold leading-6 text-red-400 hover:text-red-500 hover:border-red-300"
                                        onClick={deleteBoard}
                                      >
                                        Delete Board
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
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>

                      {title.value && (
                        <div className="flex">
                          {!initialState ? (
                            <>
                              <button
                                type="button"
                                onClick={() => title.set('')}
                                className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                <span aria-hidden="true">&larr;</span>
                                <span className="ml-2">Back</span>
                              </button>
                              <button
                                type="button"
                                onClick={publishBoard}
                                className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              >
                                Create Board
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={updateBoard}
                              className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                              Update Board
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
}
