import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { CategoryMenu, CoverImageMenu } from '@/components/Menus';
import { SelectableBoardTypes } from '@/components/SelectableBoardTypes';
import { useMutateBoard } from '@/hooks';
import { Board } from '@/types';
import { capitalizeFirstLetter } from '@/utils';

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
  initialBoard?: Board;
};

export default function BoardSlideover({ open, setOpen, initialBoard }: Props) {
  const {
    title,
    description,
    type,
    category,
    tags,
    image,
    publishBoard,
    updateBoard,
    deleteBoard,
  } = useMutateBoard({ onSuccess: () => setOpen(false), initialBoard });

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
                            {!initialBoard ? (
                              !type.value ? (
                                <span>Create a new board</span>
                              ) : (
                                <span>{type.value.title}</span>
                              )
                            ) : (
                              <span>Edit your board</span>
                            )}
                          </Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm font-light text-gray-300">
                            {!initialBoard ? (
                              !type.value ? (
                                <span>
                                  Get started by choosing a board type.
                                </span>
                              ) : (
                                <span>
                                  Fill in the details below to create your
                                  desired board.
                                </span>
                              )
                            ) : (
                              <span>
                                Edit the details below to update your board.
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {!type.value ? (
                        <div className="p-6">
                          <SelectableBoardTypes
                            setSelectedBoardType={type.set}
                          />
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
                                              .map(capitalizeFirstLetter)
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
                                    image={image.value}
                                    setImage={image.set}
                                  />
                                </div>
                              </div>

                              {initialBoard && (
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
                          className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>

                      {type.value && (
                        <div className="flex">
                          {!initialBoard ? (
                            <>
                              <button
                                type="button"
                                onClick={() => type.set(null)}
                                className="flex items-center rounded-md bg-white px-3 py-2 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                              >
                                <span aria-hidden="true">&larr;</span>
                                <span className="ml-2">Back</span>
                              </button>
                              <button
                                type="button"
                                onClick={publishBoard}
                                className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              >
                                Create Board
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={updateBoard}
                              className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
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
