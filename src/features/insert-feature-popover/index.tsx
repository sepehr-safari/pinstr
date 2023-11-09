import { Popover, Transition } from '@headlessui/react';
import {
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  RectangleGroupIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { usePopper } from 'react-popper';
import { useSearchParams } from 'react-router-dom';

import { joinClassNames } from '@/shared/utils';
import { PopoverButton } from './types';

// TODO: refactor - replace popover with menu component
// use menu items with their onClick handlers

export const InsertFeaturePopover = () => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const [_, setSearchParams] = useSearchParams();

  const buttons: PopoverButton[] = useMemo(
    () => [
      {
        title: 'Text',
        description: 'Insert a block of text including a title',
        icon: DocumentTextIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Text');
              return searchParams;
            },
            { replace: true }
          ),
      },
      {
        title: 'Link',
        description: 'Insert a button with a custom title',
        icon: LinkIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Link');
              return searchParams;
            },
            { replace: true }
          ),
      },
      {
        title: 'Image',
        description: 'Insert a titled image',
        icon: PhotoIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Image');
              return searchParams;
            },
            { replace: true }
          ),
      },
      {
        title: 'Video',
        description: 'Insert a titled video',
        icon: VideoCameraIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Video');
              return searchParams;
            },
            { replace: true }
          ),
      },
      {
        title: 'Profile',
        description: 'Insert a NOSTR profile',
        icon: UserIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Profile');
              return searchParams;
            },
            { replace: true }
          ),
      },
      {
        title: 'Note',
        description: 'Insert a NOSTR note',
        icon: ChatBubbleLeftIcon,
        onClick: () =>
          setSearchParams(
            (searchParams) => {
              searchParams.set('insert-feature', 'Note');
              return searchParams;
            },
            { replace: true }
          ),
      },
    ],
    [setSearchParams]
  );

  return (
    <>
      <Popover className="relative">
        <Popover.Button ref={setReferenceElement} className="focus:outline-none">
          <div className="inline-flex items-center rounded-full bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-700 sm:py-2">
            <RectangleGroupIcon className="-ml-1 mr-3 h-6 w-6 hidden sm:block" />
            Insert New Feature
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
                    <div className={joinClassNames('font-semibold', item.color || 'text-gray-900')}>
                      {item.title}
                    </div>
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
    </>
  );
};
