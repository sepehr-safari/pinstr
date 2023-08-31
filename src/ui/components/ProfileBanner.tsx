import { nip19 } from 'nostr-tools';
import { useLocation, useParams } from 'react-router-dom';

import { useAuthor } from '@/logic/queries';
import { joinClassNames, loader } from '@/logic/utils';

export const ProfileBanner = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub } = useParams();

  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data: author } = useAuthor(hex);
  const { banner, displayName } = author || {};

  return (
    <div
      className={joinClassNames(
        '-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md',
        state?.backgroundLocation ? 'h-40' : 'h-52'
      )}
    >
      {!!banner ? (
        <img
          className="w-full h-full object-cover text-white md:rounded-t-md"
          src={loader(banner, { w: 1000, h: 256 })}
          alt={`${displayName} banner`}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full md:rounded-t-md bg-gradient-to-br from-purple-900 to-purple-600" />
      )}
    </div>
  );
};