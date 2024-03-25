import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useNdk, useSubscribe } from 'nostr-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Board } from '@/shared/types';
import { getInvoiceAmount, parseBoardFromEvent } from '@/shared/utils';

const BOOSTR_PUBKEY = import.meta.env.VITE_BOOSTR_NOSTR_PUBKEY as string;

const aMonthAgoInSec = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30;

export const useFeaturedBoards = () => {
  const [filteredBoostRequests, setFilteredBoostRequests] = useState<NDKEvent[]>([]);

  const processedBoostRequests = useRef<string[]>([]);

  const { ref } = useInView();

  const { ndk } = useNdk();

  const { events: boostRequests } = useSubscribe({
    filters: [
      {
        kinds: [1],
        limit: 10,
        authors: [BOOSTR_PUBKEY],
        since: aMonthAgoInSec,
      },
    ],
    enabled: Boolean(BOOSTR_PUBKEY),
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
            const durationInHours = Number(
              event.tags.find((t) => t[0] === 'boostDuration')?.[1] || '0'
            );
            const durationInMs = durationInHours * 60 * 60 * 1000;

            const nowInMs = Date.now();

            const eventInMs = (event.created_at || 0) * 1000;

            const isExpired = nowInMs - eventInMs > durationInMs;

            if (!isExpired) {
              setFilteredBoostRequests((prev) => [...prev, event]);
            }
          }
        });
    });
  }, [boostRequests, ndk, setFilteredBoostRequests]);

  const filters = useMemo(
    () =>
      filteredBoostRequests.map((event) => {
        const authorNpub = event.tags.find((t) => t[0] === 'boardAuthor')?.[1] || '';
        const authorPubkey = new NDKUser({ npub: authorNpub }).pubkey;

        const title = event.tags.find((t) => t[0] === 'boardTitle')?.[1] || '';
        const decodedTitle = decodeURIComponent(title);

        return {
          authors: [authorPubkey],
          '#d': [decodedTitle],
        };
      }),
    [filteredBoostRequests]
  );

  const { events, eose, isSubscribed } = useSubscribe({
    filters,
    enabled: filters.length > 0,
  });

  const boards = useMemo(
    () =>
      events.reduce(
        (boards, event) => {
          const parsedBoard = parseBoardFromEvent(event);

          if (!parsedBoard) return boards;

          if (boards.find((b) => b.event.id === parsedBoard.event.id)) return boards;

          const boardAuthor = encodeURIComponent(event.author.npub);
          const boardTitle = encodeURIComponent(parsedBoard.title || '');
          const booster =
            filteredBoostRequests
              .find(
                (e) =>
                  e.tags.find((t) => t[0] === 'boardAuthor' && t[1] === boardAuthor) &&
                  e.tags.find((t) => t[0] === 'boardTitle' && t[1] === boardTitle)
              )
              ?.tags.find((t) => t[0] === 'booster')?.[1] || '';

          return [...boards, { ...parsedBoard, booster }];
        },
        [] as Array<Board & { booster: string }>
      ),
    [events]
  );

  // useEffect(() => {
  //   if (!isFetching && inView) {
  //     loadMore();
  //   }
  // }, [isFetching, inView, loadMore]);

  return {
    boards,
    isPending: !eose && boards.length == 0,
    isEmpty: boards.length == 0 && eose,
    isSubscribed,
    ref,
  };
};
