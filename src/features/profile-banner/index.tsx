import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { cn, loader } from '@/shared/utils';

export const ProfileBanner = () => {
  const [profile, setProfile] = useState<NDKUserProfile | undefined | null>(undefined);

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub } = useParams();

  const { ndk } = useNdk();

  ndk
    .getUser({ npub })
    .fetchProfile()
    .then((profile) => {
      setProfile(profile);
    });

  const name = profile?.name || '';
  const banner = profile?.banner || '';

  return (
    <div
      className={cn(
        '-mt-20 absolute top-0 w-full bg-gray-300 rounded-t-md',
        state?.backgroundLocation ? 'h-40' : 'h-52'
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
