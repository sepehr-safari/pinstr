import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthor } from '@/logic/queries';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data: pubkey } = useQuery({
    queryKey: ['app', 'user', 'pubkey'],
    queryFn: () => {
      const pubkey: string | null = queryClient.getQueryData(['app', 'user', 'pubkey']) || null;

      return pubkey;
    },
    staleTime: Infinity,
  });

  const { data: seckey } = useQuery({
    queryKey: ['app', 'user', 'seckey'],
    queryFn: () => {
      const seckey: string | null = queryClient.getQueryData(['app', 'user', 'seckey']) || null;

      return seckey;
    },
    staleTime: Infinity,
  });

  const { data: metadata } = useAuthor(pubkey || undefined);

  return { pubkey, seckey, metadata };
};
