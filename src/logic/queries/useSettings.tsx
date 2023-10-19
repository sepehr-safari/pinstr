import { useUser } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { NDKFilter } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';
import { Settings } from '../types';
import { parseSettingsFromEvent } from '../utils';

const defaultSettings: Settings = {
  muteList: [],
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const { pubkey } = useUser();

  const ndk = useLocalStore((state) => state.ndk);

  useEffect(() => {
    if (!pubkey || !!settings || !ndk) return;

    const filter: NDKFilter = {
      kinds: [30078],
      limit: 1,
      authors: [pubkey],
      '#d': ['pinstr-settings'],
    };

    ndk.fetchEvent(filter).then((event) => {
      if (!event) return;

      const fetchedSettings = parseSettingsFromEvent(event);

      setSettings(fetchedSettings);
    });
  }, [pubkey, settings, ndk, setSettings]);

  return { settings };
};
