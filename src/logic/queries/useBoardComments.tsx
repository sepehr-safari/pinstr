import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStore } from '../store';
import { NDKBoard } from '../types';

export const useBoardComments = (board: NDKBoard | undefined) => {
  const isSubscribed = useRef(false);

  const [comments, setComments] = useState<NDKEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(() => {
    if (!ndk || !board) return;

    const filter: NDKFilter = {
      '#a': [`${33889}:${board.author.pubkey}:${board.title}`],
      kinds: [1],
    };

    const subscription = ndk.subscribe([filter]);

    subscription.on('event', async (event: NDKEvent) => {
      if (isLoading) setIsLoading(false);

      setComments((prev) => [...prev, event]);
    });

    subscription.on('eose', () => {
      if (isLoading) setIsLoading(false);
    });
  }, [ndk, board, setComments, setIsLoading, isLoading]);

  useEffect(() => {
    if (!board || !ndk) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, board]);

  return { comments, isLoading };
};
