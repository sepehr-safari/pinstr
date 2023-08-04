import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

import { joinClassNames } from '@/utils';

const USER = {
  name: 'Sepehr',
  imageUrl: 'https://source.unsplash.com/random/?avatar',
};
const USER_NAVIGATION = [
  { name: 'Open Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  return (
    <Disclosure as="header" className="bg-white shadow">
      <>
        <div className="mx-auto px-4 sm:px-6 lg:divide-y lg:divide-gray-200">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex lg:px-0">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="/assets/pinstr.png"
                  alt="Pinstr"
                />
                <div className="ml-2 hidden md:block font-bold">Pinstr</div>
              </div>
            </div>

            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
              <div className="w-full sm:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center">
              {!loggedIn && (
                <button
                  className="ml-6 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  onClick={() => setLoggedIn(true)}
                >
                  Login
                </button>
              )}

              {/* Profile dropdown */}
              {loggedIn && (
                <Menu as="div" className="relative flex-shrink-0">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={USER.imageUrl}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item as="a">
                        <img
                          className="mt-4 mx-auto h-24 w-24 flex-shrink-0 rounded-full"
                          src={USER.imageUrl}
                          alt=""
                        />
                        <h3 className="mt-2 mb-4 text-sm font-semibold text-gray-900 text-center">
                          {USER.name}
                        </h3>
                      </Menu.Item>
                      <div className="py-1">
                        {USER_NAVIGATION.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={joinClassNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
