import { Popover } from '@headlessui/react';
import { PlusIcon, UserIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { Link, useLocation } from 'react-router-dom';

import { Author } from '@/types';
import { loader } from '@/utils';

export const AuthorOverview = ({ author }: { author: Author }) => {
  const location = useLocation();

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
            {author.displayName}
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
                      className="w-full h-24 object-cover bg-gray-200 text-gray-200 rounded-t"
                      src={loader(author.banner, { w: 300, h: 96 })}
                      alt={author.displayName + ' banner'}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-10 pb-4">
                    <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
                      <img
                        className="w-24 h-24 rounded-full"
                        src={loader(author.picture, { w: 96, h: 96 })}
                        alt={author.displayName + ' avatar'}
                        loading="lazy"
                      />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold">
                      {author.displayName}
                    </h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-xs font-light text-gray-500">
                        {author.about}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <Link
                        to={`/p/${author.npub}`}
                        state={{ backgroundLocation: location }}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-bl-lg border border-transparent py-2 text-xs font-semibold text-gray-900 hover:underline"
                      >
                        <UserIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Open Profile
                      </Link>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <a
                        href={''}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-br-lg border border-transparent py-2 text-xs font-semibold text-gray-900 hover:underline"
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
};
