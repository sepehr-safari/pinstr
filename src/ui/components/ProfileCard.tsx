import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthor } from '@/logic/queries';
import { loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';

export const ProfileCard = () => {
  const { npub } = useParams();

  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: author, status } = useAuthor(hex);
  const { displayName, picture, nip05, about } = author || {};

  if (status == 'loading') {
    return (
      <div className="h-32 flex justify-center items-center overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center bg-white shadow-md z-[1] rounded-none xl:rounded-xl xl:items-start">
      <div className="flex flex-col gap-4 w-full items-center xl:flex-row xl:items-stretch">
        <a
          href={`https://primal.net/p/${npub}`}
          target="_blank"
          rel="noreferrer"
          className="-mt-16 overflow-hidden shrink-0 h-24 w-24 bg-gray-200 text-gray-200 shadow-lg rounded-full absolute z-[2] xl:static xl:mt-0 hover:cursor-pointer"
        >
          <div className="relative">
            <div className="absolute duration-300 text-white text-xs text-center font-semibold inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black/70">
              Open With Primal
            </div>
            <img
              src={!!picture ? loader(picture, { w: 96, h: 96 }) : ''}
              alt={`${displayName} avatar`}
              loading="lazy"
            />
          </div>
        </a>

        <div className="mt-12 w-full text-center xl:text-start xl:mt-0 xl:flex xl:flex-col xl:justify-around">
          <Link to={`/p/${npub}`} className="max-w-fit hover:underline">
            <h2 className="text-lg font-semibold xl:leading-none">{displayName || ''}</h2>
          </Link>

          <span className="mt-1 text-xs font-light text-gray-500">{nip05 || ''}</span>

          <button
            onClick={() => toast('This feature is still under development.', { type: 'warning' })}
            className="mt-1 hidden w-full xl:inline-flex justify-center items-center rounded-full bg-gray-900 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
          >
            <PlusIcon className="-ml-1 w-4 h-4" />
            <span className="ml-1">Follow</span>
          </button>
        </div>
      </div>

      <span className="mt-4 text-xs font-light text-gray-700 xl:mt-6">{about || ''}</span>

      <button
        onClick={() => toast('This feature is still under development.', { type: 'warning' })}
        className="mt-4 inline-flex xl:hidden justify-center items-center rounded-full bg-gray-900 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
      >
        <PlusIcon className="-ml-1 w-4 h-4" />
        <span className="ml-1">Follow</span>
      </button>
    </div>
  );
};
