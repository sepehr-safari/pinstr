import { PlusIcon } from '@heroicons/react/20/solid';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthor } from '@/shared/hooks/queries';
import { ellipsis, joinClassNames, loader } from '@/shared/utils';

import { Spinner } from '@/shared/components';

export const ProfileCard = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub } = useParams();
  const { author, isLoading } = useAuthor(npub);
  const name = author?.profile?.name || '';
  const image = author?.profile?.image || '';
  const nip05 = author?.profile?.nip05 || '';
  const about = author?.profile?.about || '';

  if (isLoading) {
    return (
      <div className="h-32 flex justify-center items-center overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className={joinClassNames(
        'flex flex-col z-[1] max-w-screen-lg mx-auto',
        state?.backgroundLocation ? 'mt-44' : 'mt-56'
      )}
    >
      <div className="flex flex-col gap-4 w-full items-center">
        <a
          href={`https://njump.me/${npub}`}
          target="_blank"
          rel="noreferrer"
          className="-mt-16 overflow-hidden shrink-0 h-24 w-24 bg-gray-200 text-gray-200 shadow-lg rounded-full static hover:cursor-pointer"
        >
          <div className="relative h-full w-full">
            <div className="absolute duration-300 text-white text-xs text-center font-semibold inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black/70">
              Open in njump
            </div>
            <img
              src={!!image ? loader(image, { w: 96, h: 96 }) : ''}
              alt={`${name} avatar`}
              loading="lazy"
              className="rounded-full border-white border-2"
            />
          </div>
        </a>

        <div className="w-full text-center">
          <Link to={`/p/${npub}`} className="max-w-fit hover:underline">
            <h2 className="text-xl font-bold [overflow-wrap:anywhere] xl:leading-6">
              {name ? ellipsis(name, 100) : ''}
            </h2>
          </Link>

          <span className="mt-1 text-xs font-light text-gray-500 [overflow-wrap:anywhere]">
            {nip05 ? ellipsis(nip05, 60) : ''}
          </span>

          <div className="flex justify-center">
            <button
              onClick={() => toast('This feature is still under development.', { type: 'warning' })}
              className="mt-2 px-4 inline-flex justify-center items-center rounded-full bg-gray-900 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700"
            >
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-auto max-w-lg">
        <p className="text-center text-xs text-gray-700 [overflow-wrap:anywhere]">
          {about ? ellipsis(about, 1000) : ''}
        </p>
      </div>
    </div>
  );
};
