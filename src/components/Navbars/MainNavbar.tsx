import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { CreatePopover } from '@/components/Popovers';
import { useUser } from '@/queries';
import { joinClassNames, loader } from '@/utils';

const USER_NAVIGATION = [
  { title: 'Open Profile', link: '#' },
  { title: 'Settings', link: '#' },
  { title: 'Sign out', link: '/logout' },
];

export const MainNavbar = () => {
  const { pubkey, metadata } = useUser();

  USER_NAVIGATION[0].link = pubkey ? `/p/${nip19.npubEncode(pubkey)}` : '#';

  return (
    <Disclosure
      as="header"
      className="bg-white shadow fixed top-0 left-0 right-0 bg-opacity-50 z-[5] backdrop-filter backdrop-blur-lg"
    >
      <>
        <div className="mx-auto px-4 sm:px-6 lg:divide-y lg:divide-gray-200">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex lg:px-0">
              <Link to="/" className="flex flex-shrink-0 items-center">
                <img
                  className="h-10 w-auto rounded-md bg-gray-100 text-gray-100"
                  src="/assets/pinstr.svg"
                  alt="Pinstr Logo"
                  loading="lazy"
                />
                <div className="ml-2 hidden md:block font-bold text-lg">Pinstr</div>
              </Link>
            </div>

            <div className="relative z-0 flex flex-1 items-center justify-center px-2 md:absolute md:inset-0">
              <div className="w-full md:max-w-sm">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border-0 bg-opacity-30 bg-white py-3 pl-10 pr-3 text-xs text-gray-900 ring-1 ring-inset ring-gray-900/20 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-500 focus:bg-opacity-50"
                    placeholder="Search boards, tags, and people"
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center">
              {!pubkey && (
                <Link
                  to="/login"
                  className="inline-flex rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
                >
                  Login
                </Link>
              )}

              {pubkey && (
                <>
                  <CreatePopover />

                  <Menu as="div" className="relative flex-shrink-0">
                    <>
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full bg-gray-200 text-gray-200"
                            src={
                              metadata?.picture
                                ? loader(metadata?.picture, {
                                    w: 96,
                                    h: 96,
                                  })
                                : ''
                            }
                            alt={metadata?.displayName + ' avatar'}
                            loading="lazy"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-75"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-6 w-64 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white py-1 shadow-lg ring-1 ring-gray-900/20 focus:outline-none">
                          <Menu.Item as="div">
                            <img
                              className="mt-4 mx-auto h-24 w-24 flex-shrink-0 rounded-full bg-gray-100 text-gray-100"
                              src={
                                metadata?.picture
                                  ? loader(metadata?.picture, {
                                      w: 96,
                                      h: 96,
                                    })
                                  : ''
                              }
                              alt={metadata?.displayName + ' avatar'}
                              loading="lazy"
                            />
                            <h3 className="mt-2 mb-4 text-sm font-semibold text-gray-900 text-center">
                              {metadata?.displayName}
                            </h3>
                          </Menu.Item>
                          <div className="py-1">
                            {USER_NAVIGATION.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={joinClassNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-center text-sm font-medium text-gray-900'
                                    )}
                                  >
                                    {item.title}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  </Menu>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};
