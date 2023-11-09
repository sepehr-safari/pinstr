import { NDKEvent, NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useEffect, useRef, useState } from 'react';

import { useLocalStore } from '@/shared/store';

/**
 * Custom hook to fetch an NDKEvent by ID and return its state.
 * @param id - The ID of the NDKEvent to fetch.
 * @returns An object containing the fetched NDKEvent, and its state (isPending, isEmpty).
 */
export const useEvent = (idOrFilter: string | NDKFilter<NDKKind> | undefined) => {
  const shouldFetch = useRef<boolean>(true);

  const [event, setEvent] = useState<NDKEvent | undefined | null>(undefined);
  const [error, setError] = useState<any>(undefined);

  const isPending = event == undefined;
  const isEmpty = event == null;

  const ndk = useLocalStore((state) => state.ndk);

  useEffect(() => {
    if (!idOrFilter || !ndk || !shouldFetch.current) return;

    shouldFetch.current = false;

    ndk
      .fetchEvent(idOrFilter)
      .then((event) => {
        event ? event.author.fetchProfile().finally(() => setEvent(event)) : setEvent(null);
      })
      .catch((err) => {
        setError(err);
        setEvent(null);
      });
  }, [idOrFilter, ndk, setEvent, setError]);

  return { event, isPending, isEmpty, error };
};
