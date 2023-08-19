import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPublicKey } from 'nostr-tools';

type User = {
  pubkey: string;
  seckey?: string;
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['app', 'user'],
    queryFn: () => {
      const user: User | null =
        queryClient.getQueryData(['app', 'user']) || null;

      return user;
    },
  });

  return {
    doLoginWithExtension: async () => {
      if ((window as any).nostr) {
        const pubkey = (await (window as any).nostr.getPublicKey()) as string;

        queryClient.setQueryData(['app', 'user'], {
          pubkey,
        });
      } else {
        throw new Error('Nostr extension not found');
      }
    },
    doLoginWithSeckey: (seckey: string) => {
      try {
        const pubkey = getPublicKey(seckey);
        queryClient.setQueryData(['app', 'user'], {
          pubkey,
          seckey,
        });
      } catch (err) {
        console.log('login error', err);
      }
    },
    doLogout: () => {
      queryClient.removeQueries(['app', 'user']);
    },
    user,
  };
};
