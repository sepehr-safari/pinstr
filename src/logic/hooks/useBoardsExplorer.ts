import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';

import { useFiltersParams } from '@/logic/hooks';
import { useEvents, useSettings } from '@/logic/queries';
import { useInView } from 'react-intersection-observer';
import { Board } from '../types';
import { isMutedEvent, parseBoardFromEvent } from '../utils';

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

  let boards: Board[] = [];

  events
    .filter((e) => !isMutedEvent(e, muteList))
    .forEach((e) => {
      try {
        boards.push(parseBoardFromEvent(e));
      } catch (_) {}
    });

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
