import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useFiltersParams } from '@/logic/hooks';
import { useEvents, useSettings } from '@/logic/queries';
import { Board } from '@/logic/types';
import { isMutedEvent, parseBoardFromEvent } from '@/logic/utils';

export const useBoardsExplorer = () => {
  const { ref, inView } = useInView();

  const { category, format, tag } = useFiltersParams();
  const c = category.value;
  const f = format.value;
  const t = tag.value;

  const { settings } = useSettings();
  const muteList = settings ? settings.muteList : undefined;

  const filter: NDKFilter = {
    kinds: [33889 as NDKKind],
    limit: 50,
  };
  if (!!c) filter['#c'] = [c];
  if (!!f) filter['#f'] = [f];
  if (!!t) filter['#t'] = [t];

  const { events, hasMore, isDone, isEmpty, isFetching, isPending, loadMore } = useEvents({
    filters: [filter],
  });

  const boards = useMemo(
    () =>
      events
        .filter((event) => !isMutedEvent(event, muteList))
        .reduce((boards, event) => {
          const parsedBoard = parseBoardFromEvent(event);
          return parsedBoard ? [...boards, parsedBoard] : boards;
        }, [] as Board[]),
    [events, muteList]
  );

  return {
    boards,
    hasMore,
    isDone,
    isEmpty: isEmpty || (boards.length == 0 && isDone),
    isFetching,
    isPending,
    loadMore,
    ref,
    inView,
  };
};
