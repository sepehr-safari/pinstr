import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEvents, useUser } from '@/shared/hooks/queries';

import type { Board } from '@/shared/types';

import { parseBoardFromEvent } from '@/shared/utils';

export const useSelectBoard = () => {
  const [searchInput, setSearchInput] = useState('');

  const { pubkey } = useUser();

  const [_, setSearchParams] = useSearchParams();

  const filter: NDKFilter = {
    kinds: [33889 as NDKKind],
    limit: 50,
  };
  if (!!pubkey) filter['authors'] = [pubkey];

  const { events, hasMore, loadMore, isFetching } = useEvents({
    filters: [filter],
  });

  const boards = useMemo(
    () =>
      events.reduce((boards, event) => {
        const parsedBoard = parseBoardFromEvent(event);
        return parsedBoard ? [...boards, parsedBoard] : boards;
      }, [] as Board[]),
    [events]
  );

  const selectBoard = (board: Board) =>
    setSearchParams(
      (searchParams) => {
        searchParams.set('title', board.title);
        searchParams.set('i', board.pins.length.toString());

        return searchParams;
      },
      { replace: true }
    );

  return {
    boards,
    hasMore,
    isFetching,
    loadMore,
    selectBoard,
    searchInput,
    setSearchInput,
  };
};
