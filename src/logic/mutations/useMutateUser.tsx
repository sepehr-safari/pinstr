import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPublicKey } from 'nostr-tools';

export const useMutateUser = () => {
  const queryClient = useQueryClient();

  return {
    loginWithExtension: useMutation({
      mutationFn: async () => {
        if ((window as any).nostr) {
          const pubkey = (await (window as any).nostr.getPublicKey()) as string;

          queryClient.setQueryData(['app', 'user', 'pubkey'], pubkey);

          return Promise.resolve();
        } else {
          throw new Error('Nostr extension not found');
        }
      },
      onSuccess: () => queryClient.invalidateQueries(['app', 'user']),
    }),
    loginWithSeckey: useMutation({
      mutationFn: (seckey: string) => {
        try {
          const pubkey = getPublicKey(seckey);

          queryClient.setQueryData(['app', 'user', 'pubkey'], pubkey);
          queryClient.setQueryData(['app', 'user', 'seckey'], seckey);

          return Promise.resolve();
        } catch (err) {
          throw new Error('Invalid seckey');
        }
      },
      onSuccess: () => queryClient.invalidateQueries(['app', 'user']),
    }),
    logout: useMutation({
      mutationFn: () => {
        queryClient.removeQueries(['app', 'user']);
        return Promise.resolve();
      },
      onSuccess: () => queryClient.invalidateQueries(['app', 'user']),
    }),
  };
};
