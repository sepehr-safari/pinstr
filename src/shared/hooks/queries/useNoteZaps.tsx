import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStore } from '@/shared/store';

export const useNoteZaps = (note: NDKEvent | undefined) => {
  const isSubscribed = useRef(false);

  const [zaps, setZaps] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(() => {
    if (!ndk || !note) return;

    const filter: NDKFilter = {
      '#e': [note.id],
      kinds: [9735],
    };

    const subscription = ndk.subscribe([filter]);

    subscription.on('event', async (event: NDKEvent) => {
      setIsLoading(false);

      setZaps((prev) => [...prev, event]);
    });

    subscription.on('eose', () => {
      setIsLoading(false);
    });
  }, [ndk, note, setZaps, setIsLoading]);

  useEffect(() => {
    if (!note || !ndk) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, note]);

  return { zaps, isLoading };
};
