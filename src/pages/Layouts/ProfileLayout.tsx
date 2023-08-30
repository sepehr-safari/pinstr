import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { BoardSummary } from '@/components';
import { Breadcrumb } from '@/components/Navbars';
import { useAuthor } from '@/queries';
import { joinClassNames, loader } from '@/utils';

const Banner = ({
  banner,
  displayName,
}: {
  banner: string | undefined;
  displayName: string | undefined;
}) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md">
      {!!banner ? (
        <img
          className={joinClassNames(
            'w-full object-cover text-white md:rounded-t-md',
            state?.backgroundLocation ? 'h-40' : 'h-52'
          )}
          src={loader(banner, { w: 1000, h: 256 })}
          alt={`${displayName} banner`}
          loading="lazy"
        />
      ) : (
        <div className="h-52 md:rounded-t-md xl:h-64 bg-gradient-to-br from-purple-900 to-purple-600" />
      )}
    </div>
  );
};

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto relative max-w-screen-4xl gap-8 flex flex-col xl:flex-row xl:p-10">
    {children}
  </div>
);

const MainContainer = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div
      className={joinClassNames(
        'w-full h-full px-8 pb-20 xl:px-0',
        state?.backgroundLocation ? 'xl:mt-16' : 'xl:mt-28'
      )}
    >
      <div className="mb-6">
        <Breadcrumb />
      </div>

      <Outlet />
    </div>
  );
};

const StickyContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-4 w-full xl:max-w-xs',
        'xl:self-start xl:sticky',
        state?.backgroundLocation ? 'xl:top-10' : 'mt-24 xl:mt-12 xl:top-24'
      )}
    >
      {children}
    </div>
  );
};

const ProfileCard = ({
  displayName,
  picture,
  nip05,
  about,
  npub,
}: {
  displayName: string | undefined;
  picture: string | undefined;
  nip05: string | undefined;
  about: string | undefined;
  npub: string | undefined;
}) => (
  <div className="p-6 flex flex-col items-center bg-white shadow-md z-[1] rounded-none xl:rounded-xl xl:items-start">
    <div className="flex flex-col gap-4 w-full items-center xl:flex-row xl:items-stretch">
      <a
        href={`https://primal.net/${npub}`}
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
        <h2 className="text-lg font-semibold xl:leading-none">{displayName || ''}</h2>
        <span className="mt-1 text-xs font-light text-gray-500">{nip05 || ''}</span>

        <button className="mt-1 hidden w-full xl:inline-flex justify-center items-center rounded-full bg-gray-900 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">
          <PlusIcon className="-ml-1 w-4 h-4" />
          <span className="ml-1">Follow</span>
        </button>
      </div>
    </div>

    <span className="mt-4 text-xs font-light text-gray-700 xl:mt-6">{about || ''}</span>

    <button className="mt-4 inline-flex xl:hidden justify-center items-center rounded-full bg-gray-900 px-6 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gray-700">
      <PlusIcon className="-ml-1 w-4 h-4" />
      <span className="ml-1">Follow</span>
    </button>
  </div>
);

export const ProfileLayout = () => {
  const { npub } = useParams();

  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: author } = useAuthor(hex);
  const { banner, displayName, picture, nip05, about } = author || {};

  return (
    <>
      <div className="relative bg-gray-100 min-h-[100vh] rounded-t-md">
        <Banner banner={banner} displayName={displayName} />

        <MaxWidthContainer>
          <StickyContainer>
            <ProfileCard
              about={about}
              displayName={displayName}
              nip05={nip05}
              npub={npub}
              picture={picture}
            />

            <BoardSummary />
          </StickyContainer>

          <MainContainer />
        </MaxWidthContainer>
      </div>
    </>
  );
};
