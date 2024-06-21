import { useLocation, useParams } from 'react-router-dom';

import { useAuthor } from '@/shared/hooks/queries';
import { joinClassNames, loader } from '@/shared/utils';

export const ProfileBanner = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub } = useParams();
  const { author } = useAuthor(npub);
  const name = author?.profile?.name || '';
  const banner = author?.profile?.banner || '';

  return (
    <div
      className={joinClassNames(
        '-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md',
        state?.backgroundLocation ? 'h-60' : 'h-72'
      )}
    >
      {!!banner ? (
        <img
          className="w-full h-full object-cover text-white md:rounded-t-md"
          src={loader(banner, { w: 1000, h: 256 })}
          alt={`${name} banner`}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full md:rounded-t-md bg-gradient-to-br from-purple-900 to-purple-600" />
      )}
    </div>
  );
};
