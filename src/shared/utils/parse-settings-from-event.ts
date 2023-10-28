import { Settings } from 'shared/types';
import { NDKEvent } from '@nostr-dev-kit/ndk';

export const parseSettingsFromEvent = (event: NDKEvent) => {
  const settings: Settings = {
    muteList: [],
  };

  for (const tag of event.tags) {
    if (tag[0] === 'mute list') {
      settings.muteList = tag.slice(1);
    }
  }

  return settings;
};
