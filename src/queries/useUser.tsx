import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPublicKey } from 'nostr-tools';

import { useAuthor } from '@/queries';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: pubkey } = useQuery({
    queryKey: ['app', 'user', 'pubkey'],
    queryFn: () => {
      const pubkey: string | null =
        queryClient.getQueryData(['app', 'user', 'pubkey']) || null;

      return pubkey;
    },
  });

  const { data: seckey } = useQuery({
    queryKey: ['app', 'user', 'seckey'],
    queryFn: () => {
      const seckey: string | null =
        queryClient.getQueryData(['app', 'user', 'seckey']) || null;

      return seckey;
    },
  });

  const { data: metadata } = useAuthor(pubkey || undefined);

  return {
    doLoginWithExtension: async () => {
      if ((window as any).nostr) {
        const pubkey = (await (window as any).nostr.getPublicKey()) as string;

        queryClient.setQueryData(['app', 'user', 'pubkey'], pubkey);
      } else {
        throw new Error('Nostr extension not found');
      }
    },
    doLoginWithSeckey: (seckey: string) => {
      try {
        const pubkey = getPublicKey(seckey);

        queryClient.setQueryData(['app', 'user', 'pubkey'], pubkey);
        queryClient.setQueryData(['app', 'user', 'seckey'], seckey);
      } catch (err) {
        console.log('login error', err);
      }
    },
    doLogout: () => {
      queryClient.removeQueries(['app', 'user']);
    },
    pubkey,
    seckey,
    metadata,
  };
};
