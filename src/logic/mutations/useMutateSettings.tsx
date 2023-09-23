import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { usePublish } from '@/logic/mutations';

export const useMutateSettings = () => {
  const [_, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const publish = usePublish();

  const publishSettingsFn = useCallback(
    async (muteList: string[]) => {
      return publish({
        kind: 30078 as number,
        tags: [
          ['d', 'pinstr-settings'],
          ['mute list', ...(muteList || [])],
        ],
      });
    },
    [publish]
  );

  return {
    publishSettings: useMutation({
      mutationFn: (muteList: string[]) =>
        toast.promise(publishSettingsFn(muteList), {
          pending: 'Saving...',
          error: 'An error has been occured! Please try again.',
          success: 'Successfully saved!',
        }),
      onSuccess: (event) => {
        queryClient.invalidateQueries({
          queryKey: ['nostr', 'settings', event.pubkey],
        });

        setSearchParams(
          (searchParams) => {
            searchParams.delete('settings');
            return searchParams;
          },
          { replace: true }
        );
      },
    }),
  };
};
