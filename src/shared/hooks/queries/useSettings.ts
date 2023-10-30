import { NDKFilter } from '@nostr-dev-kit/ndk';

import { useEvent, useUser } from '@/shared/hooks/queries';
import { Settings } from '@/shared/types';
import { parseSettingsFromEvent } from '@/shared/utils';

const defaultSettings: Settings = {
  muteList: [],
};

export const useSettings = () => {
  const { pubkey } = useUser();

  const filter: NDKFilter | undefined = !!pubkey
    ? {
        kinds: [30078],
        limit: 1,
        authors: [pubkey],
        '#d': ['pinstr-settings'],
      }
    : undefined;

  const { event } = useEvent(filter);

  const settings: Settings | undefined =
    event == undefined
      ? undefined
      : event == null
      ? defaultSettings
      : parseSettingsFromEvent(event);

  return { settings };
};
