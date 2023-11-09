import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';

import { useEvent, useSettings } from '@/shared/hooks/queries';
import { isMutedEvent, parseBoardFromEvent } from '@/shared/utils';

type Params = {
  author: string | undefined;
  title: string | undefined;
};

export const useBoard = ({ author, title }: Params) => {
  const { settings } = useSettings();
  const muteList = settings ? settings.muteList : undefined;

  const filter: NDKFilter | undefined =
    !!author && !!title
      ? {
          kinds: [33889 as NDKKind],
          authors: [author],
          '#d': [title],
        }
      : undefined;

  const { event } = useEvent(filter);

  if (event == undefined) return undefined;

  if (event == null) return null;

  if (isMutedEvent(event, muteList)) return null;

  return parseBoardFromEvent(event);
};
