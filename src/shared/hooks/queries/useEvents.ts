import { NDKEvent, NDKFilter, NDKSubscription, NDKSubscriptionOptions } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocalStore } from '@/shared/store';

type Params = {
  filters: NDKFilter[];
  enabled?: boolean;
  subscriptionOptions?: NDKSubscriptionOptions;
};

/**
 * Custom hook that subscribes to NDK events based on provided filters and options.
 * @param filters - An array of filters to apply to the subscription.
 * @param enabled - A boolean indicating whether the subscription is enabled.
 * @param subscriptionOptions - An object containing options for the subscription.
 * @returns An object containing the subscribed events, a boolean indicating whether there are more events to load, a function to load more events, and various loading states.
 */
export const useEvents = ({ filters, enabled = true, subscriptionOptions }: Params) => {
  const subscription = useRef<NDKSubscription | undefined>(undefined);

  const [events, setEvents] = useState<NDKEvent[]>([]);
  const [eose, setEose] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const isPending = !eose && events.length == 0;
  const isEmpty = eose && events.length == 0;
  const isDone = eose && events.length > 0;
  const isFetching = !isDone && !isEmpty && !isPending;

  const ndk = useLocalStore((state) => state.ndk);

  /**
   * Function that subscribes to NDK events.
   * @param _until - A number indicating until when to subscribe.
   * @param _closeOnEose - A boolean indicating whether to close the subscription on end of stream.
   */
  const subscribe = useCallback(
    async (_until?: number | undefined, _closeOnEose?: boolean) => {
      if (!ndk) return;

      let hasEvents = false;

      subscription.current = ndk.subscribe(
        filters.map((f) => ({ ...f, until: _until || f.until })),
        { ...subscriptionOptions, closeOnEose: _closeOnEose || subscriptionOptions?.closeOnEose }
      );

      subscription.current.on('event', (event: NDKEvent) => {
        hasEvents = true;

        event.author
          .fetchProfile()
          .finally(() =>
            setEvents((prev) => [...prev, event].sort((a, b) => b.created_at! - a.created_at!))
          );
      });

      subscription.current.on('eose', () => {
        if (hasEvents == false) {
          setHasMore(false);
        }

        setEose(true);
      });
    },
    [ndk, setEvents, setEose, setHasMore, filters, subscriptionOptions]
  );

  /**
   * Function that loads more events.
   */
  const loadMore = useCallback(() => {
    if (!hasMore) return;

    setEose(false);
    subscribe((events[events.length - 1].created_at || 2) - 1, true);
  }, [hasMore, setEose, subscribe, events]);

  useEffect(() => {
    if (enabled && !subscription.current) subscribe();
  }, [enabled, subscribe]);

  useEffect(() => {
    return () => {
      subscription.current?.stop();
    };
  }, []);

  return { events, hasMore, loadMore, isPending, isDone, isEmpty, isFetching };
};
