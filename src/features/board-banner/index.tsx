import { NDKUser } from '@nostr-dev-kit/ndk';
import { useLocation, useParams } from 'react-router-dom';

import { useBoard } from '@/shared/hooks/queries';
import { joinClassNames, loader } from '@/shared/utils';

export const BoardBanner = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub, title } = useParams();
  const ndkUser = npub ? new NDKUser({ npub }) : undefined;
  const author = ndkUser?.pubkey;

  const board = useBoard({ author, title });

  const banner = board?.image || '';

  return (
    <div
      className={joinClassNames(
        '-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md',
        state?.backgroundLocation ? 'h-60' : 'h-72'
      )}
    >
      {!!banner ? (
        <>
          <h2
            className={joinClassNames(
              'absolute inset-0 px-4 flex items-center justify-center bg-black/30 text-white text-2xl font-semibold text-center xl:text-3xl xl:font-bold',
              state?.backgroundLocation ? '' : 'mt-20'
            )}
          >
            {board?.title}
          </h2>

          <img
            className="w-full h-full object-cover text-white md:rounded-t-md"
            src={loader(banner, { w: 1000, h: 256 })}
            alt={`${board?.title}`}
            loading="lazy"
          />
        </>
      ) : (
        <div className="w-full h-full md:rounded-t-md bg-gradient-to-br from-purple-900 to-purple-600" />
      )}
    </div>
  );
};
