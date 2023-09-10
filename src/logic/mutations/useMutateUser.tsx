import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPublicKey } from 'nostr-tools';
import { toast } from 'react-toastify';

export const useMutateUser = () => {
  const queryClient = useQueryClient();

  return {
    loginWithExtension: useMutation({
      mutationFn: async () => {
        if ((window as any).nostr) {
          try {
            const pubkey = (await (window as any).nostr.getPublicKey()) as string;

            queryClient.setQueryData(['app', 'user', 'pubkey'], pubkey);

            return Promise.resolve();
          } catch (error) {
            return Promise.reject(new Error('Cannot get public key'));
          }
        } else {
          return Promise.reject(new Error('Nostr extension not found'));
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['app', 'user']);

        toast('Successfully logged in!', { type: 'success' });
      },
      onError: () => {
        toast('Error logging in!', { type: 'error' });
      },
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
      onSuccess: () => {
        queryClient.invalidateQueries(['app', 'user']);

        toast('Successfully logged in!', { type: 'success' });
      },
      onError: () => {
        toast('Error logging in!', { type: 'error' });
      },
    }),
    logout: useMutation({
      mutationFn: () => {
        queryClient.removeQueries(['app', 'user']);
        return Promise.resolve();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['app', 'user']);

        toast('Successfully logged out!', { type: 'success' });
      },
    }),
  };
};
