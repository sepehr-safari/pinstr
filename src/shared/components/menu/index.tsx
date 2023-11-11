import { Menu as HeadlessuiMenu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { joinClassNames } from '@/shared/utils';

import { type MenuItem } from './types';

export type * from './types';

type Props = {
  items: MenuItem[];
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
  label: string;
  onSelect: (item: MenuItem) => void;
  disabled?: boolean;
};

export const Menu = ({
  items,
  variant = 'primary',
  icon,
  label,
  onSelect,
  disabled = false,
}: Props) => {
  return (
    <HeadlessuiMenu as="div" className="relative inline-block text-left w-full">
      <div>
        <HeadlessuiMenu.Button
          disabled={disabled}
          className={joinClassNames(
            'inline-flex w-full justify-center gap-x-1.5 rounded-full px-3 py-2 text-xs font-light shadow-sm ring-1 ring-inset',
            variant === 'primary'
              ? 'bg-gray-900 text-white ring-gray-900/20 hover:bg-gray-800 disabled:bg-gray-900 disabled:text-gray-500'
              : 'bg-white text-gray-900 ring-gray-900/20 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-500'
          )}
        >
          {icon}
          {label}
        </HeadlessuiMenu.Button>
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
        <HeadlessuiMenu.Items className="absolute left-0 z-20 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-gray-900/10 max-h-80 overflow-y-auto focus:outline-none">
          <div>
            {items.map((item, index) => (
              <HeadlessuiMenu.Item key={index}>
                {({ active }) => (
                  <button
                    className={joinClassNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-6 py-2 text-left text-sm'
                    )}
                    onClick={() => onSelect(item)}
                  >
                    {item.icon && (
                      <div
                        className={joinClassNames(
                          'rounded-md w-10 h-10 flex justify-center items-center',
                          item.icon.bgColor || 'bg-transparent'
                        )}
                      >
                        <div className="duration-300 group-hover:scale-125">{item.icon.node}</div>
                      </div>
                    )}

                    <div className={joinClassNames(item.color || 'text-gray-900')}>
                      <div className="font-semibold">{item.title}</div>

                      {!!item.description && (
                        <p className="opacity-80 font-light text-xs sm:text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                )}
              </HeadlessuiMenu.Item>
            ))}
          </div>
        </HeadlessuiMenu.Items>
      </Transition>
    </HeadlessuiMenu>
  );
};
