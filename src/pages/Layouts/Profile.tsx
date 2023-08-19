import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Outlet, useParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Navbars';
import { useAuthors } from '@/queries';

export default function Profile() {
  const { npub } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : null;
  const { authors } = useAuthors({ authors: [hex!], enabled: !!hex });
  const hasAuthor = !!authors && !!authors.length;

  return (
    <>
      <div className="relative bg-gray-100 min-h-full rounded-t-md">
        <div className="-mt-16 bg-gray-200 rounded-t-md">
          <img
            className="h-52 w-full object-cover object-center text-gray-200 md:rounded-t-md xl:h-64"
            src={hasAuthor ? authors[0].banner : ''}
            alt={hasAuthor ? authors[0].displayName : ' banner'}
          />
        </div>

        <div className="mx-auto max-w-screen-4xl">
          <div className="mt-0 overflow-hidden bg-white shadow-lg rounded-none w-full z-[1] xl:ml-12 xl:-mt-20 xl:w-80 xl:absolute xl:rounded-lg">
            <div className="px-6 py-10 flex flex-col items-center">
              <img
                className="-mt-20 h-28 w-28 bg-gray-200 text-gray-200 object-cover object-center shadow-lg rounded-full absolute z-[2] xl:static xl:mt-0"
                src={hasAuthor ? authors[0].picture : ''}
                alt={hasAuthor ? authors[0].displayName : ' avatar'}
              />

              <h2 className="mt-12 text-lg font-semibold xl:mt-4">
                {hasAuthor ? authors[0].displayName : ''}
              </h2>
              <span className="text-xs font-light text-gray-500">
                {hasAuthor ? authors[0].nip05 : ''}
              </span>
              <span className="mt-4 text-xs font-light text-gray-500 text-center">
                {hasAuthor ? authors[0].about : ''}
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

          <div className="w-full h-full px-6 pb-16 pt-8 xl:pl-[26rem] xl:pr-12">
            <div className="pb-8">
              <Breadcrumb />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
