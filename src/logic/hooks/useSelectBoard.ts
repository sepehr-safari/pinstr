import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEvents, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { parseBoardFromEvent } from '@/logic/utils';

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

  const boards = events.map((e) => parseBoardFromEvent(e));

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
