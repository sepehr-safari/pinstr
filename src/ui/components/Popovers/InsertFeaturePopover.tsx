import {
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  RectangleGroupIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PopoverButton } from '@/logic/types';

import { PopoverTemplate } from './';

export const InsertFeaturePopover = () => {
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
      <PopoverTemplate buttons={buttons}>
        <div className="inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">
          <RectangleGroupIcon className="-ml-1 mr-3 h-6 w-6" />
          Insert a Feature
        </div>
      </PopoverTemplate>
    </>
  );
};
