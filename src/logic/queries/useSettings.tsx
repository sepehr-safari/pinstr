import { useQuery } from '@tanstack/react-query';
import { Event, Filter } from 'nostr-tools';
import { useCallback } from 'react';

import { useUser } from '@/logic/queries';
import { useLocalStore } from '@/logic/store';
import { Settings } from '@/logic/types';
import { parseSettingsFromEvent } from '@/logic/utils';

export const useSettings = () => {
  const pool = useLocalStore((store) => store.pool);
  const relays = useLocalStore((store) => store.relays);

  const { pubkey } = useUser();

  const fetchSettings = useCallback(async () => {
    if (!pubkey) {
      const defaultSettings: Settings = {
        muteList: [],
      };

      return defaultSettings;
    }

    if (!pool || !relays) throw new Error('Missing dependencies in fetching settings');

    const filter: Filter = {
      kinds: [30078],
      limit: 1,
      authors: [pubkey],
      '#d': ['pinstr-settings'],
    };

    try {
      const events = (await pool.list(relays, [filter])) as Event<30078>[];

      if (events.length == 0) throw new Error('Settings event not found');

      const settings = parseSettingsFromEvent(events[0]);

      return settings;
    } catch (error) {
      throw new Error('Error in fetching settings');
    }
  }, [pool, relays, pubkey]);

  return useQuery({
    queryKey: ['nostr', 'settings', pubkey],
    queryFn: fetchSettings,
    retry: 2,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!pubkey && !!pool && !!relays,
  });
};
