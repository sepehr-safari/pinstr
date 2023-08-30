import { Popover, Transition } from '@headlessui/react';
import { useState } from 'react';
import { usePopper } from 'react-popper';

import { joinClassNames } from '@/utils';

export interface PopoverItem {
  title: string;
  onClick: () => void;
  description?: string;
  color?: string;
}

export interface PopoverProps {
  items: PopoverItem[];
  children: React.ReactNode;
}

export const PopoverTemplate = ({ children, items }: PopoverProps) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
  });

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        {children}
      </Popover.Button>

      <Transition
        enter="ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <Popover.Panel
          className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className=" max-w-xs flex-auto rounded-xl bg-white p-2 text-sm shadow-lg ring-1 ring-gray-900/20">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative rounded-md p-2 hover:bg-gray-100 hover:cursor-pointer"
                onClick={item.onClick}
              >
                <div className={joinClassNames('font-semibold', item.color || 'text-gray-900')}>
                  {item.title}
                  <span className="absolute inset-0" />
                </div>
                {!!item.description && (
                  <p className="font-light text-gray-500">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
