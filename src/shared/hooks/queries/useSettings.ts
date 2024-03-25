import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscribe } from 'nostr-hooks';

import { Settings } from '@/shared/types';
import { parseSettingsFromEvent } from '@/shared/utils';

const defaultSettings: Settings = {
  muteList: [],
};

export const useSettings = () => {
  const { activeUser } = useActiveUser();

  const pubkey = activeUser?.pubkey;
  const filters: NDKFilter[] = !!pubkey
    ? [
        {
          kinds: [30078],
          limit: 1,
          authors: [pubkey],
          '#d': ['pinstr-settings'],
        },
      ]
    : [];

  const { events, eose } = useSubscribe({ filters, enabled: !!pubkey });

  let event: NDKEvent | undefined | null = undefined;
  if (events.length == 0) {
    eose && (event = null);
  } else {
    event = events[0];
  }

  const settings: Settings | undefined =
    event == undefined
      ? undefined
      : event == null
        ? defaultSettings
        : parseSettingsFromEvent(event);

  return { settings };
};
