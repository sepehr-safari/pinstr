import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateSettings } from '@/shared/hooks/mutations';
import { useSettings } from '@/shared/hooks/queries';

export const SettingsModal = () => {
  const [muteList, setMuteList] = useState<string[] | undefined>(undefined);

  const cancelButtonRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const settingsParam = searchParams.get('settings');

  const { saveMuteList } = useMutateSettings();
  const { settings } = useSettings();

  useEffect(() => {
    muteList == undefined && settings && setMuteList(settings.muteList);
  }, [muteList, settings, setMuteList]);

  return (
    <Transition.Root show={!!settingsParam} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 duration-200 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <h3 className="text-xl font-bold">Settings</h3>

                <hr className="my-2" />

                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-medium">Mute List</h4>

                  <p className="text-sm font-light">
                    We've put together some words that we think you might want to mute. You can add
                    or remove words from this list to customize it to your needs. This will apply to
                    all board titles, descriptions, tags, and comments. Images are not included.
                  </p>

                  {muteList && muteList.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {muteList.map((item, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-x-1 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 ring-1 ring-inset ring-gray-900/20"
                        >
                          <span>{item}</span>

                          <button
                            type="button"
                            onClick={() => setMuteList(muteList.filter((_, i) => i != index))}
                          >
                            <XMarkIcon className="w-4 h-4 text-gray-400 -mr-1" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    name="muteList"
                    id="muteList"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    value={muteList?.join(' ')}
                    onChange={(event) =>
                      setMuteList(
                        event.target.value
                          ? event.target.value.split(' ').filter((v, i, a) => a.indexOf(v) === i)
                          : []
                      )
                    }
                  />

                  <span className="text-xs font-light text-gray-500">
                    Use spaces to separate words e.g. word1 word2 word3
                  </span>

                  <div className="flex justify-end">
                    <button
                      ref={cancelButtonRef}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600"
                      onClick={() => {
                        settings && setMuteList(settings.muteList);

                        setSearchParams(
                          (searchParams) => {
                            searchParams.delete('settings');
                            return searchParams;
                          },
                          { replace: true }
                        );
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600"
                      onClick={() => muteList && saveMuteList(muteList)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
