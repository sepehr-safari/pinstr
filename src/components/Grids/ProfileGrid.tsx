import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DetailsSlideover } from '@/components/Slideovers';
import { useAuthor } from '@/queries';
import { Board } from '@/types';
import { joinClassNames, loader } from '@/utils';

export const ProfileGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="mx-auto mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={pin[0] + index}
            className="relative group flex flex-col justify-between rounded-lg ease-in-out duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <ProfileDetails onOpen={() => setPinIndex(index)} pubkey={pin[0]} summary />
          </li>
        ))}
      </ul>

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        onClose={() => setPinIndex(-1)}
        onPrevious={() => setPinIndex((pinIndex) => (pinIndex > -1 ? pinIndex - 1 : -1))}
        onNext={() =>
          setPinIndex((pinIndex) =>
            pinIndex > -1 && pinIndex < board.pins.length - 1 ? pinIndex + 1 : -1
          )
        }
      >
        {pinIndex > -1 && <ProfileDetails key={pinIndex} pubkey={board.pins[pinIndex][0]} />}
      </DetailsSlideover>
    </>
  );
};

const ProfileDetails = ({
  pubkey,
  onOpen,
  summary = false,
}: {
  pubkey: string;
  onOpen?: () => void;
  summary?: boolean;
}) => {
  const { data: profile } = useAuthor(pubkey);

  if (!profile) {
    return <></>; // TODO: Loading state
  }

  return (
    <>
      <div className="w-full absolute top-0">
        <Link to={`/p/${profile.npub}`}>
          <div
            className={joinClassNames(
              'w-full h-24 bg-gradient-to-br from-purple-800 to-purple-500 text-gray-200 duration-500 group-hover:rounded-b-none',
              summary ? 'rounded-lg' : 'rounded-t-lg'
            )}
          >
            {!!profile.banner && (
              <img
                className={joinClassNames(
                  'w-full h-full object-cover duration-500 group-hover:rounded-b-none',
                  summary ? 'rounded-lg' : 'rounded-t-lg'
                )}
                src={loader(profile.banner, { w: 300, h: 96 })}
                alt={profile.displayName + ' banner'}
                loading="lazy"
              />
            )}
          </div>
        </Link>
      </div>
      <div className="mt-auto flex flex-1 flex-col pt-16 items-center text-center">
        <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
          <Link to={`/p/${profile.npub}`}>
            {!!profile.picture && (
              <img
                className="w-24 h-24 rounded-full duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
                src={loader(profile.picture, { w: 96, h: 96 })}
                alt={profile.displayName + ' avatar'}
                loading="lazy"
              />
            )}
          </Link>
        </div>
        <h3 className="mt-4 truncate text-base font-semibold leading-7 tracking-tight text-gray-900">
          {summary && profile.displayName.length > 20
            ? profile.displayName.slice(0, 20) + '...'
            : profile.displayName}
        </h3>
        <p className="mt-2 text-xs font-light text-gray-700 px-4">
          {summary && profile.about.length > 100
            ? profile.about.slice(0, 100) + '...'
            : profile.about}
        </p>
      </div>

      {summary ? (
        <>
          <div className="mt-4 mx-auto flex flex-col">
            <button className="flex justify-center items-center rounded-full bg-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-500 ease-in-out duration-300 hover:shadow hover:text-gray-700 hover:bg-gray-300">
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>
          </div>

          <div className="mt-4 flex w-full border-t opacity-0 translate-y-1 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <a
              href={`https://primal.net/p/${nip19.npubEncode(pubkey)}`}
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
        </>
      ) : (
        <div className="mt-4 flex w-full border-t">
          <a
            href={`https://primal.net/p/${nip19.npubEncode(pubkey)}`}
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
      )}
    </>
  );
};
