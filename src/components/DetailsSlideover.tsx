import { Pin } from '@/types';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useCallback, useEffect } from 'react';

export const DetailsSlideover = ({
  isShown,
  onClose,
  onNext,
  onPrevious,
  children,
}: {
  isShown: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  children: React.ReactNode;
  pin: Pin;
  headers: string[];
}) => {
  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    },
    [onPrevious, onNext]
  );

  useEffect(() => {
    isShown && document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp, isShown]);

  return (
    <Transition.Root show={isShown} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden" tabIndex={0}>
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6 border-b">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          {'Details'}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div className="divide-y divide-gray-200">
                      <div className="py-6 bg-white">{children}</div>
                      <div className="px-4 py-5 sm:px-0 sm:py-0">
                        <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Bio
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              <p>
                                Enim feugiat ut ipsum, neque ut. Tristique mi id
                                elementum praesent. Gravida in tempus feugiat
                                netus enim aliquet a, quam scelerisque. Dictumst
                                in convallis nec in bibendum aenean arcu.
                              </p>
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Location
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              New York, NY, USA
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Website
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              ashleyporter.com
                            </dd>
                          </div>
                          <div className="sm:flex sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                              Birthday
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                              <time dateTime="1982-06-23">June 23, 1982</time>
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="absolute bottom-0 w-full flex justify-center items-center">
                        <span className="isolate inline-flex w-full rounded-md shadow-sm">
                          <button
                            type="button"
                            onClick={onPrevious}
                            className="relative flex justify-center items-center bg-white w-full py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-500"
                          >
                            <ChevronLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            <span className="text-sm">Previous</span>
                          </button>
                          <button
                            type="button"
                            onClick={onNext}
                            className="relative -ml-px flex justify-center items-center bg-white w-full py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-gray-500"
                          >
                            <span className="text-sm">Next</span>
                            <ChevronRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </span>
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
