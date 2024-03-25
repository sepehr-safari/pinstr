import { NDKFilter, NDKKind, NDKUser } from '@nostr-dev-kit/ndk';
import { useSubscribe } from 'nostr-hooks';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';

import { useFiltersParams } from '@/shared/hooks/common';
import { useSettings } from '@/shared/hooks/queries';
import { Board } from '@/shared/types';
import { isMutedEvent, parseBoardFromEvent } from '@/shared/utils';

export const useBoardsByAuthor = () => {
  const { ref, inView } = useInView();

  const { npub } = useParams();
  const ndkUser = npub ? new NDKUser({ npub }) : undefined;
  const author = ndkUser?.pubkey;

  const { category, format, tag } = useFiltersParams();
  const c = category.value;
  const f = format.value;
  const t = tag.value;

  const { settings } = useSettings();
  const muteList = settings ? settings.muteList : undefined;

  const filter: NDKFilter = {
    kinds: [33889 as NDKKind],
    limit: 100,
  };
  if (!!author) filter['authors'] = [author];
  if (!!c) filter['#c'] = [c];
  if (!!f) filter['#f'] = [f];
  if (!!t) filter['#t'] = [t];

  const { events, eose, isSubscribed } = useSubscribe({
    filters: [filter],
    enabled: Boolean(author),
    fetchProfiles: true,
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

  // TODO: add loadMore function

  return {
    boards,
    isPending: !eose && boards.length == 0,
    isEmpty: boards.length == 0 && eose,
    isSubscribed,
    ref,
    inView,
  };
};
