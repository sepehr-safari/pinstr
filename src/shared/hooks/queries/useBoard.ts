import { NDKEvent, NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useSubscribe } from 'nostr-hooks';

import { useSettings } from '@/shared/hooks/queries';
import { isMutedEvent, parseBoardFromEvent } from '@/shared/utils';

type Params = {
  author: string | undefined;
  title: string | undefined;
};

export const useBoard = ({ author, title }: Params) => {
  const { settings } = useSettings();
  const muteList = settings ? settings.muteList : undefined;

  const filters: NDKFilter[] =
    !!author && !!title
      ? [
          {
            kinds: [33889 as NDKKind],
            limit: 1,
            authors: [author],
            '#d': [title],
          },
        ]
      : [];

  const { events, eose } = useSubscribe({
    filters,
    enabled: !!author && !!title,
    fetchProfiles: true,
  });

  let event: NDKEvent | undefined | null = undefined;
  if (events.length == 0) {
    eose && (event = null);
  } else {
    event = events[0];
  }

  if (event == undefined) return undefined;

  if (event == null) return null;

  if (isMutedEvent(event, muteList)) return null;

  return parseBoardFromEvent(event);
};
