import { NDKUser } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';

import { FeaturedBoardItemProps } from '../types';

export const useFeaturedBoardItem = ({ board }: FeaturedBoardItemProps) => {
  const [booster, setBooster] = useState<NDKUser | undefined>(undefined);

  const { ndk } = useNdk();

  const _booster = ndk.getUser({ pubkey: board.booster });

  _booster.fetchProfile().finally(() => {
    setBooster(_booster);
  });

  return { booster };
};
