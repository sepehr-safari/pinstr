import { Popover, Transition } from '@headlessui/react';
import { ListBulletIcon, PaperClipIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { usePopper } from 'react-popper';

import { useCreateBoardParams, useCreatePinParams } from 'shared/hooks/common';

// TODO: Should replace popover with menu component
export const CreatePopover = () => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const { setCreateBoardParams } = useCreateBoardParams();
  const { setCreatePinParams } = useCreatePinParams({});

  const buttons = useMemo(
    () => [
      {
        title: 'New Board',
        description: 'Create a new board',
        icon: ListBulletIcon,
        onClick: setCreateBoardParams,
      },
      {
        title: 'Add Pin',
        description: 'Add a new pin to an existing board',
        icon: PaperClipIcon,
        onClick: setCreatePinParams,
      },
    ],
    [setCreateBoardParams, setCreatePinParams]
  );

  return (
    <Popover className="relative">
      <Popover.Button ref={setReferenceElement} className="focus:outline-none">
        <div className="mr-2 inline-flex items-center rounded-full bg-gray-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 md:mr-4">
          <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
          Create
        </div>
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
          className="my-4 absolute z-10 flex w-screen max-w-max px-4"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="max-w-sm flex-auto rounded-xl bg-white p-2 text-sm shadow-lg ring-1 ring-gray-900/20">
            {buttons.map((item, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 hover:cursor-pointer"
                onClick={item.onClick}
              >
                {item.icon && (
                  <div className="bg-gray-200 rounded-md w-10 h-10 flex justify-center items-center">
                    <item.icon className="w-5 h-5 duration-300 group-hover:scale-125" />
                  </div>
                )}

                <div className="">
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  {!!item.description && (
                    <p className="font-light text-gray-500 text-xs sm:text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
