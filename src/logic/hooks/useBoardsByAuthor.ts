import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { useFiltersParams } from '@/logic/hooks';
import { useEvents, useSettings } from '@/logic/queries';
import { isMutedEvent, parseBoardFromEvent } from '@/logic/utils';

export const useBoardsByAuthor = () => {
  const { ref, inView } = useInView();

  const { npub } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

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
  if (!!author) filter['authors'] = [author];
  if (!!c) filter['#c'] = [c];
  if (!!f) filter['#f'] = [f];
  if (!!t) filter['#t'] = [t];

  const { events, hasMore, isDone, isEmpty, isFetching, isPending, loadMore } = useEvents({
    filters: [filter],
    enabled: !!author,
  });

  const boards = events
    .filter((e) => !isMutedEvent(e, muteList))
    .map((e) => parseBoardFromEvent(e));

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
