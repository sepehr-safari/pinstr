import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

import { joinClassNames } from '@/logic/utils';

export interface MenuItem {
  title: string;
  description?: string;
  value?: string;
}

export interface MenuProps {
  items: MenuItem[];
  selected: string | undefined;
  setSelected: (item: string) => void;
}

export const MenuTemplate = ({ items, selected, setSelected }: MenuProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selected || items[0].title}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-gray-900/10 max-h-80 overflow-y-auto focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={joinClassNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-6 py-4 text-left text-sm'
                    )}
                    onClick={() => setSelected(item.title)}
                  >
                    {item.title}
                    {item.description && (
                      <span className="block text-xs font-light text-gray-400">
                        {item.description}
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
