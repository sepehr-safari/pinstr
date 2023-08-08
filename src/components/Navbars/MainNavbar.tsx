import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

import { joinClassNames } from '@/utils';

import { CreateSlideover } from '@/components';

const USER = {
  name: 'Sepehr',
  imageUrl: 'https://source.unsplash.com/random/?avatar',
};
const USER_NAVIGATION = [
  { name: 'Open Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export default function MainNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Disclosure
      as="header"
      className="bg-white shadow fixed top-0 left-0 right-0 bg-opacity-50 z-[5] backdrop-filter backdrop-blur-lg"
    >
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

            <div className="relative z-0 flex flex-1 items-center justify-center px-2 md:absolute md:inset-0">
              <div className="w-full md:max-w-sm">
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
                    className="block w-full rounded-md border-0 bg-opacity-30 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:bg-opacity-50 sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center">
              {!loggedIn && (
                <button
                  className="inline-flex rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80"
                  onClick={() => setLoggedIn(true)}
                >
                  Login
                </button>
              )}

              {/* Profile dropdown */}
              {loggedIn && (
                <>
                  <button
                    className="mr-2 inline-flex items-center rounded-full bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 md:mr-4"
                    onClick={() => setOpen(true)}
                  >
                    <PlusIcon
                      className="-ml-1 mr-1 h-4 w-4"
                      aria-hidden="true"
                    />
                    Create
                  </button>

                  <CreateSlideover open={open} setOpen={setOpen} />

                  <Menu as="div" className="relative flex-shrink-0">
                    {({ open, close }) => (
                      <>
                        <div>
                          <Menu.Button
                            className="relative flex rounded-full bg-white"
                            onMouseEnter={({ currentTarget }) =>
                              !open && currentTarget.click()
                            }
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full object-cover object-center bg-gray-200"
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
                          <Menu.Items
                            onMouseLeave={close}
                            className="absolute right-0 z-10 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item as="a">
                              <img
                                className="mt-4 mx-auto h-24 w-24 object-cover object-center flex-shrink-0 rounded-full"
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
                      </>
                    )}
                  </Menu>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
