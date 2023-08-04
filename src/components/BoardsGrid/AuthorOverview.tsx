import { Popover } from '@headlessui/react';
import {
  EnvelopeIcon,
  PhoneIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/20/solid';
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
              <li className="col-span-1 flex flex-col divide-y divide-gray-200 text-center">
                <div className="flex flex-1 flex-col p-8">
                  <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src="https://source.unsplash.com/random/?avatar"
                    alt=""
                  />
                  <h3 className="mt-6 text-sm font-semibold">fiatjaf</h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-gray-500">Description</dd>
                  </dl>
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
              </li>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
