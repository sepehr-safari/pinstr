import { useNewEvent } from 'nostr-hooks';
import { useSearchParams } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';

export const useMutateSettings = () => {
  const [_, setSearchParams] = useSearchParams();

  const { toast } = useToast();

  const { createNewEvent } = useNewEvent();

  return {
    saveMuteList: async (muteList: string[]) => {
      const e = createNewEvent();
      e.content = '';
      e.kind = 30078;
      e.tags = [
        ['d', 'pinstr-settings'],
        ['mute-list', ...(muteList || [])],
      ];
      e.publish()
        .then(() => {
          toast({
            description: 'Successfully saved!',
            variant: 'success',
          });

          setSearchParams(
            (searchParams) => {
              searchParams.delete('settings');
              return searchParams;
            },
            { replace: true }
          );
        })
        .catch(() => {
          toast({
            description: 'An error has been occured! Please try again.',
            variant: 'destructive',
          });
        });
    },
  };
};
