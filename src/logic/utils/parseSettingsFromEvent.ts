import { Event } from 'nostr-tools';

import { Settings } from '@/logic/types';

export const parseSettingsFromEvent = (event: Event) => {
  const settings: Settings = {
    muteList: ['NSFW'],
  };

  for (const tag of event.tags) {
    if (tag[0] === 'mute list') {
      settings.muteList = tag.slice(1);
    }
  }

  return settings;
};
