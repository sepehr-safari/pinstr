import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { useNavigate } from 'react-router-dom';

import { useAuthor, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';
import { EllipsisPopover } from '@/ui/components/Popovers';

export const ProfileGrid = ({
  board,
  setPinIndex,
}: {
  board: Board;
  setPinIndex: (index: number) => void;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-5 5xl:grid-cols-6'
        )}
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={pin[0] + index}
            className="relative group overflow-hidden flex flex-col justify-between rounded-lg ease-in-out duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              internalLinks={[[`/p/${nip19.npubEncode(pin[0])}`, 'Open Profile']]}
              externalLinks={[
                [`https://primal.net/p/${nip19.npubEncode(pin[0])}`, 'Open With Primal'],
              ]}
              editType="pin"
              className="bottom-4 right-4"
            />

            <ProfileDetails pubkey={pin[0]} setOpenDetails={() => setPinIndex(index)} summary />
          </li>
        ))}
      </ul>
    </>
  );
};

export const ProfileDetails = ({
  pubkey,
  summary = false,
  setOpenDetails,
}: {
  pubkey: string;
  summary?: boolean;
  setOpenDetails?: () => void;
}) => {
  const navigate = useNavigate();

  const { data: profile, status } = useAuthor(pubkey);

  if (status == 'loading') {
    return (
      <div className="w-full h-32 bg-white flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!profile) {
    return <div className="w-full h-full">Profile not found!</div>;
  }

  return (
    <>
      <button
        type="button"
        onClick={summary ? setOpenDetails : () => navigate('/p/' + profile.npub)}
        className="w-full absolute top-0"
      >
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
      </button>
      <button
        type="button"
        onClick={summary ? setOpenDetails : () => navigate('/p/' + profile.npub)}
        className="w-full flex flex-col pt-16 grow items-center text-center"
      >
        <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
          {!!profile.picture && (
            <img
              className="w-24 h-24 rounded-full duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-md"
              src={loader(profile.picture, { w: 96, h: 96 })}
              alt={profile.displayName + ' avatar'}
              loading="lazy"
            />
          )}
        </div>
        <h3 className="mt-4 w-full truncate text-base font-semibold leading-7 tracking-tight text-gray-900">
          {summary && profile.displayName.length > 20
            ? profile.displayName.slice(0, 20) + '...'
            : profile.displayName}
        </h3>
        <p className="mt-2 w-full text-xs font-light text-gray-700 px-4 max-w-xs">
          {summary && profile.about.length > 100
            ? profile.about.slice(0, 100) + '...'
            : profile.about}
        </p>
      </button>

      {summary ? (
        <div className="my-4 mx-auto max-w-fit">
          <button className="flex justify-center items-center rounded-full bg-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-600 duration-200 hover:text-gray-900 hover:bg-gray-300">
            <PlusIcon className="-ml-1 w-4 h-4" />
            <span className="ml-1">Follow</span>
          </button>
        </div>
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
