import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Navbars';
import { useAuthor } from '@/queries';
import { joinClassNames, loader } from '@/utils';

export const Profile = () => {
  const { npub } = useParams();

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: author } = useAuthor(hex);

  return (
    <>
      <div className="relative bg-gray-100 min-h-[100vh] rounded-t-md">
        <div className="-mt-16 bg-gray-300 rounded-t-md">
          {author && author.banner ? (
            <img
              className="h-52 w-full object-cover text-white md:rounded-t-md xl:h-64"
              src={author ? loader(author.banner, { w: 1000, h: 256 }) : ''}
              alt={author ? author.displayName : ' banner'}
              loading="lazy"
            />
          ) : (
            <div className="h-36 md:rounded-t-md xl:h-44" />
          )}
        </div>

        <div className="mx-auto max-w-screen-4xl">
          <div
            className={joinClassNames(
              'mt-0 overflow-hidden bg-white shadow-md rounded-none w-full z-[1] xl:ml-12 xl:-mt-20 xl:w-80 xl:sticky xl:rounded-xl',
              state?.backgroundLocation ? 'xl:top-12' : 'xl:top-28'
            )}
          >
            <div className="px-6 py-10 flex flex-col items-center">
              <img
                className="-mt-20 h-24 w-24 bg-gray-200 text-gray-200 shadow-lg rounded-full absolute z-[2] xl:static xl:mt-0"
                src={author ? loader(author.picture, { w: 96, h: 96 }) : ''}
                alt={author ? author.displayName : ' avatar'}
                loading="lazy"
              />

              <h2 className="mt-12 text-lg font-semibold xl:mt-4">
                {author ? author.displayName : ''}
              </h2>
              <span className="text-xs font-light text-gray-500">
                {author ? author.nip05 : ''}
              </span>
              <span className="mt-4 text-xs font-light text-gray-500 text-center">
                {author ? author.about : ''}
              </span>

              <button className="mt-4 inline-flex justify-center items-center rounded-full bg-gray-900 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">
                <PlusIcon className="-ml-1 w-4 h-4" />
                <span className="ml-1">Follow</span>
              </button>

              <a
                href={`https://primal.net/${npub}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline"
              >
                Open with Primal
              </a>
            </div>
          </div>

          <div className="w-full h-full px-6 pb-16 pt-8 xl:pl-[26rem] xl:pr-12 xl:-mt-72">
            <div className="pb-8">
              <Breadcrumb />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
