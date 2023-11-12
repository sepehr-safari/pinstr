import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useEvents } from '@/shared/hooks/queries';
import { useLocalStore } from '@/shared/store';
import { Board } from '@/shared/types';
import { getInvoiceAmount, parseBoardFromEvent } from '@/shared/utils';

const BOOSTR_PUBKEY = import.meta.env.VITE_BOOSTR_NOSTR_PUBKEY;

export const useFeaturedBoards = () => {
  const [filteredBoostRequests, setFilteredBoostRequests] = useState<NDKEvent[]>([]);

  const processedBoostRequests = useRef<string[]>([]);

  const { ref, inView } = useInView();

  const ndk = useLocalStore((store) => store.ndk);

  const {
    events: boostRequests,
    hasMore,
    isDone,
    isEmpty,
    isFetching,
    isPending: isBoostRequestsPending,
    loadMore,
  } = useEvents({
    filters: [
      {
        kinds: [1],
        limit: 10,
        authors: [BOOSTR_PUBKEY],
      },
    ],
    enabled: BOOSTR_PUBKEY,
  });

  useEffect(() => {
    const unprocessedBoostRequests = boostRequests.filter(
      (event) => !processedBoostRequests.current.includes(event.id)
    );

    unprocessedBoostRequests.forEach((event) => {
      processedBoostRequests.current.push(event.id);

      ndk
        .fetchEvents([
          {
            '#e': [event.id],
            kinds: [9735],
          },
        ])
        .then((zaps) => {
          const zapAmounts =
            zaps.size > 0
              ? [...zaps].map((zap) =>
                  getInvoiceAmount(zap.tags.find((t) => t[0] === 'bolt11')?.[1] || '')
                )
              : undefined;
          const zapSum = zapAmounts?.reduce((a, b) => a + b) || 0;
          const expectedZapSum = event.tags.find((t) => t[0] === 'zapAmount')?.[1] || '0';

          if (zapSum >= Number(expectedZapSum)) {
            const durationInHours = event.tags.find((t) => t[0] === 'boostDuration')?.[1] || '0';

            const isExpired =
              Math.floor(Date.now() / 1000) >
              new Date(event.created_at!).getTime() + Number(durationInHours) * 60 * 60 * 1000;

            if (!isExpired) {
              setFilteredBoostRequests((prev) => [...prev, event]);
            }
          }
        });
    });
  }, [boostRequests, ndk, setFilteredBoostRequests]);

  const filters = useMemo(
    () =>
      filteredBoostRequests
        .map((event) => {
          const authorNpub = event.tags.find((t) => t[0] === 'boardAuthor')?.[1] || '';
          const authorPubkey = new NDKUser({ npub: authorNpub }).pubkey;

          const title = event.tags.find((t) => t[0] === 'boardTitle')?.[1] || '';
          const decodedTitle = decodeURIComponent(title);

          return {
            authors: [authorPubkey],
            '#d': [decodedTitle],
          };
        })
        .filter(
          (f, i, a) =>
            a.findIndex((x) => x['#d'][0] === f['#d'][0] && x['authors'][0] === f['authors'][0]) ===
            i
        ),
    [filteredBoostRequests]
  );

  const { events, isPending: isBoardsPending } = useEvents({
    filters,
    enabled: filters.length > 0,
  });

  const boards = useMemo(
    () =>
      events.reduce(
        (boards, event) => {
          const parsedBoard = parseBoardFromEvent(event);

          const boardAuthor = encodeURIComponent(event.author.npub);
          const boardTitle = encodeURIComponent(parsedBoard?.title || '');
          const booster =
            filteredBoostRequests
              .find(
                (e) =>
                  e.tags.find((t) => t[0] === 'boardAuthor' && t[1] === boardAuthor) &&
                  e.tags.find((t) => t[0] === 'boardTitle' && t[1] === boardTitle)
              )
              ?.tags.find((t) => t[0] === 'booster')?.[1] || '';

          return parsedBoard ? [...boards, { ...parsedBoard, booster }] : boards;
        },
        [] as Array<Board & { booster: string }>
      ),
    [events]
  );

  return {
    boards,
    hasMore,
    isDone,
    isEmpty: isEmpty || (boards.length == 0 && isDone),
    isFetching,
    isPending: isBoostRequestsPending || isBoardsPending,
    loadMore,
    ref,
    inView,
  };
};
