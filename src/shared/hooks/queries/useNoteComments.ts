import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStore } from '@/shared/store';

export const useNoteComments = (note: NDKEvent | undefined) => {
  const isSubscribed = useRef(false);

  const [comments, setComments] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(() => {
    if (!ndk || !note) return;

    const filter: NDKFilter = {
      '#e': [note.id],
      kinds: [1],
    };

    const subscription = ndk.subscribe([filter]);

    subscription.on('event', async (event: NDKEvent) => {
      setIsLoading(false);

      setComments((prev) => [...prev, event]);
    });

    subscription.on('eose', () => {
      setIsLoading(false);
    });
  }, [ndk, note, setComments, setIsLoading]);

  useEffect(() => {
    if (!note || !ndk) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, note]);

  return { comments, isLoading };
};
