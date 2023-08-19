import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { CreatePopover } from '@/components/Popovers';
import { useUser } from '@/queries';
import { joinClassNames } from '@/utils';

const USER = {
  name: 'Sepehr',
  image: 'https://source.unsplash.com/random/?avatar',
};
const USER_NAVIGATION = [
  { title: 'Open Profile', link: '/p/' },
  { title: 'Settings', link: '#' },
  { title: 'Sign out', link: '/logout' },
];

export const MainNavbar = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      USER_NAVIGATION[0].link = `/p/${nip19.npubEncode(user.pubkey)}`;
    }
  }, [user]);

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
                  src="/assets/pinstr.png"
                  alt="Pinstr Logo"
                />
                <div className="ml-2 hidden md:block font-bold text-lg">
                  Pinstr
                </div>
              </Link>
            </div>

            <div className="relative z-0 flex flex-1 items-center justify-center px-2 md:absolute md:inset-0">
              <div className="w-full md:max-w-sm">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
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
              {!user && (
                <Link
                  to="/login"
                  className="inline-flex rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
                >
                  Login
                </Link>
              )}

              {user && (
                <>
                  <CreatePopover />

                  <Menu as="div" className="relative flex-shrink-0">
                    <>
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full object-cover object-center bg-gray-200 text-gray-200"
                            src={USER.image}
                            alt={USER.name + ' avatar'}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0"
                        enterTo="transform opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-6 w-64 origin-top-right divide-y divide-gray-100 rounded-2xl bg-white py-1 shadow-lg ring-1 ring-gray-900/20 focus:outline-none">
                          <Menu.Item as="div">
                            <img
                              className="mt-4 mx-auto h-24 w-24 object-cover object-center flex-shrink-0 rounded-full bg-gray-100 text-gray-100"
                              src={USER.image}
                              alt={USER.name + ' avatar'}
                            />
                            <h3 className="mt-2 mb-4 text-sm font-semibold text-gray-900 text-center">
                              {USER.name}
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
