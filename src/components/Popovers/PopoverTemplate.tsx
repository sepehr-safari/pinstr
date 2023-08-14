import { Popover, Transition } from '@headlessui/react';
import { useState } from 'react';
import { usePopper } from 'react-popper';
import { PopoverProps } from './PopoverTemplate.types';

export default function PopoverTemplate({ children, items }: PopoverProps) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
  });

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        {children}
      </Popover.Button>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <Popover.Panel
          className="absolute left-1/2 z-10 mt-4 flex w-screen max-w-max -translate-x-1/2 px-4"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="w-screen max-w-sm flex-auto rounded-2xl bg-white p-4 text-sm leading-6 shadow-lg ring-1 ring-gray-900/20">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative rounded-lg p-4 hover:bg-gray-100"
                onClick={item.onClick}
              >
                <div className="font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </div>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
