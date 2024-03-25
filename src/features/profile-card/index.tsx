import { PlusIcon } from '@heroicons/react/20/solid';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components';
import { useToast } from '@/shared/components/ui/use-toast';
import { ellipsis, loader } from '@/shared/utils';

export const ProfileCard = () => {
  const [profile, setProfile] = useState<NDKUserProfile | undefined | null>(undefined);

  const { npub } = useParams();

  const { toast } = useToast();

  const { ndk } = useNdk();

  ndk
    .getUser({ npub })
    .fetchProfile()
    .then((profile) => {
      setProfile(profile);
    });

  const name = profile?.name || '';
  const image = profile?.image || '';
  const nip05 = profile?.nip05 || '';
  const about = profile?.about || '';

  if (profile === undefined) {
    return (
      <div className="h-32 flex justify-center items-center overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col bg-white shadow-md z-[1] rounded-none xl:rounded-xl">
      <div className="flex flex-col gap-4 w-full items-center xl:flex-row xl:items-stretch">
        <a
          href={`https://njump.me/${npub}`}
          target="_blank"
          rel="noreferrer"
          className="-mt-16 overflow-hidden shrink-0 h-24 w-24 bg-gray-200 text-gray-200 shadow-lg rounded-full absolute z-[2] xl:static xl:mt-0 hover:cursor-pointer"
        >
          <div className="relative h-full w-full">
            <div className="absolute duration-300 text-white text-xs text-center font-semibold inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black/70">
              Open in njump
            </div>
            <img
              src={!!image ? loader(image, { w: 96, h: 96 }) : ''}
              alt={`${name} avatar`}
              loading="lazy"
            />
          </div>
        </a>

        <div className="mt-12 w-full text-center xl:text-start xl:mt-0 xl:flex xl:flex-col xl:justify-around">
          <Link to={`/p/${npub}`} className="max-w-fit hover:underline">
            <h2 className="text-lg font-semibold [overflow-wrap:anywhere] xl:leading-6">
              {name ? ellipsis(name, 100) : ''}
            </h2>
          </Link>

          <span className="mt-1 text-xs font-light text-gray-500 [overflow-wrap:anywhere]">
            {nip05 ? ellipsis(nip05, 60) : ''}
          </span>

          <div className="flex justify-center">
            <button
              onClick={() =>
                toast({
                  description: 'This feature is still under development.',
                  variant: 'destructive',
                })
              }
              className="mt-2 hidden w-full xl:inline-flex justify-center items-center rounded-full bg-gray-900 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-auto max-w-lg xl:mt-6">
        <p className="text-center text-xs font-light text-gray-700 [overflow-wrap:anywhere]">
          {about ? ellipsis(about, 1000) : ''}
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() =>
            toast({
              description: 'This feature is still under development.',
              variant: 'destructive',
            })
          }
          className="mt-4 inline-flex xl:hidden justify-center items-center rounded-full bg-gray-900 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
        >
          <PlusIcon className="-ml-1 w-4 h-4" />
          <span className="ml-1">Follow</span>
        </button>
      </div>
    </div>
  );
};
