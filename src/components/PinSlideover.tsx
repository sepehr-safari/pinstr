import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Props = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export default function PinSlideover({ open, setOpen }: Props) {
  // TODO
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
                            Add Pin
                          </Dialog.Title>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-300">
                            Fill out the form below to add a new pin to one of
                            your existing boards. If you want to create a new
                            board, you are in the wrong place!
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label htmlFor="name" className="flex flex-col">
                                <span className="text-sm font-medium leading-6 text-gray-900">
                                  Name
                                </span>
                                <span className="text-xs font-light text-gray-500">
                                  Choose a short and descriptive name for your
                                  pin.
                                </span>
                              </label>
                              <div className="mt-2">
                                <input
                                  // ref={nameRef}
                                  type="text"
                                  name="name"
                                  id="name"
                                  autoComplete="off"
                                  tabIndex={1}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="content"
                                className="flex flex-col"
                              >
                                <span className="text-sm font-medium leading-6 text-gray-900">
                                  Content
                                </span>
                                <span className="text-xs font-light text-gray-500">
                                  Enter the content of your pin (e.g. a link or
                                  a text).
                                </span>
                              </label>
                              <div className="mt-2">
                                <input
                                  // ref={contentRef}
                                  type="text"
                                  name="content"
                                  id="content"
                                  autoComplete="off"
                                  autoFocus
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <span className="flex flex-col">Picture</span>
                              <div className="mt-2">
                                {/* <CoverImageMenu
                                  coverImageURL={coverImageURL.get}
                                  setCoverImageURL={coverImageURL.set}
                                /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        // onClick={addPin}
                        className="ml-4 inline-flex justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                      >
                        Add Pin
                      </button>
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
