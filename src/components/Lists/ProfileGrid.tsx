import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { useAuthor } from '@/queries';
import { Board, Pin } from '@/types';
import { loader } from '@/utils';

const ProfileGridItem = ({
  index,
  pin,
  headers,
  onNext,
  onPrevious,
  onClose,
  onOpen,
  openByIndex,
}: {
  index: number;
  pin: Pin;
  headers: string[];
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onOpen: () => void;
  openByIndex: number;
}) => {
  const pubkey = pin[0];
  const { data: profile } = useAuthor(pubkey);

  if (!profile) {
    return <></>; // TODO: Loading state
  }

  return (
    <>
      <div className="absolute top-0 w-full">
        <img
          className="w-full h-24 bg-gray-200 text-gray-200 rounded-lg ease-in-out duration-500 group-hover:rounded-b-none"
          src={loader(profile.banner, { w: 300, h: 96 })}
          alt={profile.displayName + ' banner'}
          loading="lazy"
        />
      </div>
      <div className="mt-auto flex flex-1 flex-col pt-16">
        <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
          <img
            className="w-24 h-24 rounded-full ease-in-out duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
            src={loader(profile.picture, { w: 96, h: 96 })}
            alt={profile.displayName + ' avatar'}
            loading="lazy"
          />
        </div>
        <h3 className="mt-6 truncate text-base font-semibold leading-7 tracking-tight text-gray-900">
          {profile.displayName}
        </h3>
        <p className="text-sm leading-6 text-gray-600 px-4">
          {profile.about.length > 100
            ? profile.about.slice(0, 100) + '...'
            : profile.about}
        </p>
      </div>

      <div className="mt-6 mx-auto flex flex-col">
        <button className="flex justify-center items-center rounded-full bg-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-500 ease-in-out duration-300 hover:shadow hover:text-gray-700 hover:bg-gray-300">
          <PlusIcon className="-ml-1 w-4 h-4" />
          <span className="ml-1">Follow</span>
        </button>
      </div>

      <div className="mt-8 flex w-full border-t opacity-0 -translate-y-1 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-y-0">
        <a
          href="https://primal.net/note1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
        >
          Open with Primal
        </a>

        <button
          className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
          onClick={onOpen}
        >
          View details
        </button>
      </div>

      <DetailsSlideover
        isShown={openByIndex === index}
        onClose={onClose}
        onNext={onNext}
        onPrevious={onPrevious}
        pin={pin}
        headers={headers}
      >
        <div className="max-w-sm mx-auto">
          <div className="relative group rounded-lg shadow-md bg-white">
            <div className="absolute top-0 w-full">
              <img
                className="w-full h-24 bg-gray-200 text-gray-200 rounded-lg rounded-b-none"
                src={loader(profile.banner, { w: 300, h: 96 })}
                alt={profile.displayName + ' banner'}
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col pt-16">
              <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
                <img
                  className="w-24 h-24 rounded-full"
                  src={loader(profile.picture, { w: 96, h: 96 })}
                  alt={profile.displayName + ' avatar'}
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-center text-base font-semibold leading-7 tracking-tight text-gray-900">
                {profile.displayName}
              </h3>
              <p className="text-sm text-center leading-6 text-gray-600">
                {profile.about}
              </p>
            </div>

            <div className="flex w-full border-t">
              <a
                href={`https://primal.net/${profile.npub}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
              >
                Open with Primal
              </a>

              <button className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900">
                <PlusIcon className="-ml-1 w-4 h-4" />
                <span className="ml-1">Follow</span>
              </button>
            </div>
          </div>
        </div>
      </DetailsSlideover>
    </>
  );
};

export const ProfileGrid = ({ board }: { board: Board }) => {
  const [openByIndex, setOpenByIndex] = useState(-1);

  return (
    <>
      <ul
        role="list"
        className="mx-auto mt-14 grid grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={index}
            className="relative group flex flex-col justify-between rounded-lg ease-in-out duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <ProfileGridItem
              index={index}
              pin={pin}
              headers={board.headers}
              onNext={() => {
                setOpenByIndex(index + 1);
              }}
              onPrevious={() => {
                setOpenByIndex(index - 1);
              }}
              onOpen={() => setOpenByIndex(index)}
              onClose={() => setOpenByIndex(-1)}
              openByIndex={openByIndex}
            />
          </li>
        ))}
      </ul>
    </>
  );
};