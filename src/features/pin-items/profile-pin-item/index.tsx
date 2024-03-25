import { PlusIcon } from '@heroicons/react/20/solid';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EllipsisPopover } from '@/features';

import { Board } from '@/shared/types';
import { cn, ellipsis, loader } from '@/shared/utils';
import { useToast } from '@/shared/components/ui/use-toast';

type Props = {
  board: Board;
  setPinIndex: (index: number) => void;
};

export const ProfilePinItem = ({ board, setPinIndex }: Props) => {
  const { activeUser } = useActiveUser();
  const selfBoard = activeUser ? activeUser.pubkey == board.event.author.pubkey : false;

  const [lastPinIndex, setLastPinIndex] = useState<number>(50);
  const hasNextPage = board.pins.length > lastPinIndex;

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ul
        role="list"
        className={cn(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-5 5xl:grid-cols-6'
        )}
      >
        {board.pins.slice(0, lastPinIndex).map((pin, index) => (
          <li
            key={pin[0]}
            className="relative group overflow-hidden flex flex-col justify-between rounded-lg ease-in-out duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              internalLinks={[[`/p/${nip19.npubEncode(pin[0])}`, 'Open profile']]}
              externalLinks={[[`https://njump.me/${nip19.npubEncode(pin[0])}`, 'Open in njump']]}
              editType="pin"
              className="bottom-4 right-4"
            />

            <ProfileDetails pubkey={pin[0]} setOpenDetails={() => setPinIndex(index)} summary />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className="mt-16 mb-10 mx-auto block text-gray-700 bg-gray-200 text-xs px-10 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
          onClick={() => setLastPinIndex((index) => index + 50)}
        >
          Show More
        </button>
      )}
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
  const [profile, setProfile] = useState<NDKUserProfile | undefined | null>(undefined);

  const navigate = useNavigate();

  const { toast } = useToast();

  const { ndk } = useNdk();

  ndk
    .getUser({ pubkey })
    .fetchProfile()
    .then((profile) => {
      setProfile(profile);
    });

  if (profile == null) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-white rounded-lg min-h-[20rem]">
        Profile not found!
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={summary ? setOpenDetails : () => navigate('/p/' + profile.npub)}
        disabled={profile == undefined}
        className="w-full absolute top-0 disabled:pointer-events-none"
      >
        <div
          className={cn(
            'w-full h-24 text-gray-200 duration-500 group-hover:rounded-b-none',
            summary ? 'rounded-lg' : 'rounded-t-lg',
            profile == undefined
              ? 'animate-pulse bg-gray-300'
              : 'bg-gradient-to-br from-purple-800 to-purple-500'
          )}
        >
          {!!profile?.banner && (
            <img
              className={cn(
                'w-full h-full object-cover duration-500 group-hover:rounded-b-none',
                summary ? 'rounded-lg' : 'rounded-t-lg'
              )}
              src={loader(profile.banner, { w: 300, h: 96 })}
              alt={profile.name + ' banner'}
              loading="lazy"
            />
          )}
        </div>
      </button>
      <button
        type="button"
        onClick={summary ? setOpenDetails : () => navigate('/p/' + profile?.npub)}
        disabled={profile == undefined}
        className="w-full flex flex-col pt-16 grow items-center text-center disabled:pointer-events-none"
      >
        <div
          className={cn(
            'mx-auto rounded-full overflow-hidden w-24 h-24 text-gray-300 z-[1] duration-500',
            profile == undefined
              ? 'bg-gray-200'
              : 'bg-gradient-to-tl from-purple-800 to-purple-500 group-hover:scale-110'
          )}
        >
          {!!profile?.image && (
            <img
              className="w-full h-full"
              src={loader(profile?.image, { w: 96, h: 96 })}
              alt={profile?.name + ' avatar'}
              loading="lazy"
            />
          )}
        </div>
        <h3 className="mt-4 w-full truncate text-base font-semibold leading-7 tracking-tight text-gray-900">
          {profile ? (
            summary ? (
              ellipsis(profile.name || '', 20)
            ) : (
              ellipsis(profile.name || '', 30)
            )
          ) : (
            <div className="animate-pulse mx-auto w-1/2 h-[2rem] rounded bg-gray-200" />
          )}
        </h3>
        {profile ? (
          <p className="mt-2 w-full text-xs font-light text-gray-700 px-4 max-w-xs [overflow-wrap:anywhere]">
            {summary ? ellipsis(profile.about || '', 100) : ellipsis(profile.about || '', 1000)}
          </p>
        ) : (
          <div className="animate-pulse h-[4rem] rounded bg-gray-200" />
        )}
      </button>

      {summary ? (
        profile ? (
          <div className="my-4 mx-auto max-w-fit">
            <button
              onClick={() =>
                toast({
                  description: 'This feature is still under development.',
                  variant: 'destructive',
                })
              }
              className="flex justify-center items-center rounded-full bg-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-600 duration-200 hover:text-gray-900 hover:bg-gray-300"
            >
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>
          </div>
        ) : (
          <div className="animate-pulse mx-auto w-1/4 my-4 h-[2rem] rounded bg-gray-200" />
        )
      ) : (
        <div className="mt-4 flex w-full border-t">
          <a
            href={`https://njump.me/${nip19.npubEncode(pubkey)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Open in njump
          </a>

          <button
            onClick={() =>
              toast({
                description: 'This feature is still under development.',
                variant: 'destructive',
              })
            }
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            <PlusIcon className="-ml-1 w-4 h-4" />
            <span className="ml-1">Follow</span>
          </button>
        </div>
      )}
    </>
  );
};
