import { Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

export const TransitionWrapper = ({
  children,
  overlay,
}: {
  children: ReactNode;
  overlay: boolean;
}) => {
  return (
    <>
      <Transition>
        {overlay && (
          <Transition.Child
            as={Fragment}
            enter="duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 z-[4] bg-black/30 rounded-lg" />
          </Transition.Child>
        )}
        <Transition.Child
          as={Fragment}
          enter="duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-2"
        >
          {children}
        </Transition.Child>
      </Transition>
    </>
  );
};
