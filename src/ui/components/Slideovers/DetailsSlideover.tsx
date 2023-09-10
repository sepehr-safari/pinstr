import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { useUser } from '@/logic/queries';
import { Board, Format } from '@/logic/types';
import { loader } from '@/logic/utils';

import { NoteDetails, ProfileDetails } from '@/ui/components/Grids';
import { EllipsisPopover } from '@/ui/components/Popovers';

export const DetailsSlideover = ({
  board,
  pinIndex,
  setPinIndex,
}: {
  board: Board;
  pinIndex: number;
  setPinIndex: Dispatch<SetStateAction<number>>;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const previous = useCallback(
    () => setPinIndex((prev) => (prev > -1 ? prev - 1 : -1)),
    [setPinIndex]
  );
  const next = useCallback(
    () => setPinIndex((prev) => (prev > -1 && prev < board.pins.length - 1 ? prev + 1 : -1)),
    [setPinIndex, board.pins.length]
  );
  const close = useCallback(() => setPinIndex(-1), [setPinIndex]);

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previous();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    },
    [previous, next]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <Transition.Root show={pinIndex > -1} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden focus:outline-none" tabIndex={0}>
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
                <Dialog.Panel className="group relative py-16 bg-white  shadow-xl pointer-events-auto w-screen max-w-lg">
                  <div className="flex h-full flex-col overflow-y-scroll">
                    <EllipsisPopover
                      board={board}
                      pinIndex={pinIndex}
                      selfBoard={selfBoard}
                      editType="pin"
                      className="top-3 left-3"
                      overlay={false}
                      slideInFrom="left"
                    />

                    <div className="px-4 py-4 sm:px-6 border-b bg-white absolute top-0 left-0 right-0">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900"></Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={close}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-200 h-full w-full bg-white p-4">
                      <div className="w-full h-full flex flex-col gap-4 items-center self-start sm:gap-8">
                        {pinIndex > -1 &&
                          board.headers.map((header, hIndex) => {
                            const [format, title] = header.split(':');
                            const value = board.pins[pinIndex][hIndex];

                            if (value == '') return null;

                            switch (format as Format) {
                              case Format.Image:
                                return (
                                  <div
                                    key={hIndex}
                                    className="flex flex-col items-center gap-2 w-full pb-4 sm:w-3/4"
                                  >
                                    {title != 'Content' && title != 'Image' && (
                                      <span className="text-sm font-semibold">{title}</span>
                                    )}

                                    <div className="overflow-hidden rounded-md bg-gray-200 text-gray-200">
                                      <a href={value} target="_blank" rel="noreferrer">
                                        <img
                                          src={loader(value, { w: 500, h: 400 })}
                                          alt={title}
                                          className="hover:opacity-75 hover:cursor-zoom-in"
                                          loading="lazy"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                );
                              case Format.Video:
                                return (
                                  <div
                                    key={hIndex}
                                    className="flex flex-col items-center gap-2 w-full pb-4 sm:w-3/4"
                                  >
                                    {title != 'Content' && (
                                      <span className="text-sm font-semibold">{title}</span>
                                    )}

                                    <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-black">
                                      <ReactPlayer
                                        url={value}
                                        width="100%"
                                        height="100%"
                                        controls
                                      />
                                    </div>
                                  </div>
                                );
                              case Format.Text:
                                return (
                                  <div
                                    key={hIndex}
                                    className="flex flex-col gap-2 items-center w-full pb-4 sm:w-3/4"
                                  >
                                    {title == 'Title' ? (
                                      <span className="text-xl font-semibold leading-5">
                                        {value}
                                      </span>
                                    ) : title == 'Content' ? (
                                      <span className="font-light">{value}</span>
                                    ) : (
                                      <>
                                        <span className="text-sm font-semibold">{title}: </span>
                                        <span className="text-sm font-light">{value}</span>
                                      </>
                                    )}
                                  </div>
                                );
                              case Format.Link:
                                return (
                                  <div
                                    key={hIndex}
                                    className="flex flex-col items-center w-full pb-4 sm:w-3/4"
                                  >
                                    {title == 'Content' ? (
                                      <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                      >
                                        <span>{value}</span>
                                      </a>
                                    ) : (
                                      <a
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex rounded-full bg-gray-900 px-10 py-3 text-xs text-center font-semibold text-white shadow-sm hover:bg-gray-700"
                                      >
                                        <span>{title}</span>
                                      </a>
                                    )}
                                  </div>
                                );
                              case Format.Profile:
                                return (
                                  <div
                                    key={hIndex}
                                    className="flex flex-col gap-2 items-center w-full pb-4 sm:w-3/4"
                                  >
                                    {title != 'Content' && (
                                      <span className="text-sm font-semibold">{title}</span>
                                    )}

                                    <div className="relative overflow-hidden w-full max-w-sm rounded-lg shadow-md border bg-white">
                                      <ProfileDetails pubkey={value} />
                                    </div>
                                  </div>
                                );
                              case Format.Note:
                                return (
                                  <div key={hIndex} className="pb-4">
                                    {title != 'Content' && (
                                      <div className="w-full">
                                        <span className="text-start text-sm font-semibold">
                                          {title}:
                                        </span>
                                      </div>
                                    )}

                                    <div className="relative overflow-hidden w-full max-w-sm rounded-lg shadow-md border bg-white">
                                      <NoteDetails noteId={value} />
                                    </div>
                                  </div>
                                );
                              default:
                                break;
                            }
                          })}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 flex z-5 bg-white justify-between">
                        <button
                          type="button"
                          onClick={previous}
                          className="py-2 px-2 text-gray-500/40 hover:text-gray-500 sm:px-4 md:px-8"
                        >
                          <ChevronLeftIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                        </button>

                        <button
                          type="button"
                          onClick={next}
                          className="py-2 px-2 text-gray-500/40 hover:text-gray-500 sm:px-4 md:px-8"
                        >
                          <ChevronRightIcon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
                        </button>
                      </div>
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
