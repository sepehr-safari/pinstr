import { NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';

import { useLocalStore } from '@/logic/store';

export const useAuthor = (npub: string | undefined) => {
  const [isLoading, setIsloading] = useState(true);
  const [author, setAuthor] = useState<NDKUser | undefined>(undefined);

  const ndk = useLocalStore((state) => state.ndk);

  useEffect(() => {
    if (!!ndk && !!npub) {
      const user = ndk.getUser({ npub });

      if (user.profile != undefined) return;

      user.fetchProfile().then(() => {
        setAuthor(user);
        setIsloading(false);
      });
    }
  }, [ndk, npub, setIsloading, setAuthor]);

  return { author, isLoading };
};
