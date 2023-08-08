import { Popover } from '@headlessui/react';
import { PlusIcon, UserIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function AuthorOverview() {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
  });

  return (
    <Popover className="leading-none">
      {({ open, close }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className="text-xs text-gray-500 focus:border-none focus:outline-none"
            onMouseEnter={({ currentTarget }) => !open && currentTarget.click()}
          >
            fiatjaf
          </Popover.Button>

          <Popover.Panel
            onMouseLeave={close}
            className="-mb-4 absolute left-1/2 z-10 flex w-screen max-w-min -translate-x-1/2 px-4"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="mb-6 w-72 shrink rounded-md bg-white shadow-md ring-1 ring-gray-900/20">
              <div className="text-center divide-y divide-gray-200">
                <div className="relative">
                  <div className="absolute top-0 w-full p-1">
                    <img
                      className="w-full h-20 bg-gray-200 rounded-t object-center object-cover"
                      src="https://source.unsplash.com/random/?landscape"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-10 pb-4">
                    <div className="mx-auto rounded-full bg-gray-300 z-[1]">
                      <img
                        className="aspect-1 w-24 h-w-24 object-cover object-center rounded-full"
                        src="https://source.unsplash.com/random/?avatar"
                        alt=""
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">fiatjaf</h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-xs text-gray-500">Description</dd>
                    </dl>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a
                        href={``}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:underline"
                      >
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Open Profile
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <a
                        href={''}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:underline"
                      >
                        <PlusIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Follow
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
