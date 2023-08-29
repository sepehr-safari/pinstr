import { PlusIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { Breadcrumb } from '@/components/Navbars';
import { useAuthor } from '@/queries';
import { joinClassNames, loader } from '@/utils';

const Banner = ({
  banner,
  displayName,
}: {
  banner: string | undefined;
  displayName: string | undefined;
}) => (
  <div className="-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md">
    {!!banner ? (
      <img
        className="h-52 w-full object-cover text-white md:rounded-t-md xl:h-64"
        src={loader(banner, { w: 1000, h: 256 })}
        alt={`${displayName} banner`}
        loading="lazy"
      />
    ) : (
      <div className="h-52 md:rounded-t-md xl:h-64 bg-gradient-to-br from-purple-900 to-purple-600" />
    )}
  </div>
);

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto relative max-w-screen-4xl gap-14 p-0 flex flex-col xl:flex-row xl:p-14">
    {children}
  </div>
);

const BoardDetails = () => (
  <div className="mt-0 w-full h-full px-8 pb-20 xl:mt-40 xl:px-0">
    <div className="pb-8">
      <Breadcrumb />
    </div>
    <Outlet />
  </div>
);

const ProfileContainer = ({
  children,
  backgroundLocation,
}: {
  children: React.ReactNode;
  backgroundLocation?: Location | undefined;
}) => (
  <div
    className={joinClassNames(
      'mt-28 w-full xl:max-w-xs xl:mt-0',
      'xl:self-start xl:sticky',
      backgroundLocation ? 'xl:top-12' : 'xl:top-28'
    )}
  >
    {children}
  </div>
);

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
  <div className="px-6 py-10 flex flex-col items-center bg-white shadow-md z-[1] rounded-none xl:rounded-xl">
    <img
      className="-mt-16 h-24 w-24 bg-gray-200 text-gray-200 shadow-lg rounded-full absolute z-[2] xl:static xl:mt-0"
      src={!!picture ? loader(picture, { w: 96, h: 96 }) : ''}
      alt={`${displayName} avatar`}
      loading="lazy"
    />

    <h2 className="mt-12 text-lg font-semibold xl:mt-4">{displayName || ''}</h2>
    <span className="text-xs font-light text-gray-500">{nip05 || ''}</span>
    <span className="mt-4 text-xs font-light text-gray-700 text-center">
      {about || ''}
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
);

export const ProfileLayout = () => {
  const { npub } = useParams();

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: author } = useAuthor(hex);
  const { banner, displayName, picture, nip05, about } = author || {};

  return (
    <>
      <div className="relative bg-gray-100 min-h-[100vh] rounded-t-md">
        <Banner banner={banner} displayName={displayName} />

        <MaxWidthContainer>
          <ProfileContainer backgroundLocation={state?.backgroundLocation}>
            <ProfileCard
              about={about}
              displayName={displayName}
              nip05={nip05}
              npub={npub}
              picture={picture}
            />
          </ProfileContainer>

          <BoardDetails />
        </MaxWidthContainer>
      </div>
    </>
  );
};
