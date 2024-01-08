import { NDKUser } from '@nostr-dev-kit/ndk';

import { useAuthor } from '@/shared/hooks/queries';

import { FeaturedBoardItemProps } from '../types';

export const useFeaturedBoardItem = ({ board }: FeaturedBoardItemProps) => {
  const npub = board.booster ? new NDKUser({ pubkey: board.booster }).npub : undefined;

  const { author } = useAuthor(npub);

  return { author };
};
