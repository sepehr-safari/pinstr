import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStore } from '@/shared/store';
import { Board } from '@/shared/types';

export const useBoardLikes = (board: Board | undefined) => {
  const isSubscribed = useRef(false);

  const [likes, setLikes] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(() => {
    if (!ndk || !board) return;

    const filter: NDKFilter = {
      '#a': [`${33889}:${board.event.author.pubkey}:${board.title}`],
      kinds: [7],
    };

    const subscription = ndk.subscribe([filter]);

    subscription.on('event', async (event: NDKEvent) => {
      setIsLoading(false);

      setLikes((prev) => [...prev, event]);
    });

    subscription.on('eose', () => {
      setIsLoading(false);
    });
  }, [ndk, board, setLikes, setIsLoading]);

  useEffect(() => {
    if (!board || !ndk) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, board]);

  return { likes, isLoading };
};
