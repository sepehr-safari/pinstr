import { NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';

import { useEvent, useSettings } from '@/logic/queries';
import { isMutedEvent, parseBoardFromEvent } from '@/logic/utils';
import { Board } from '../types';

type Params = {
  author: string | undefined;
  title: string | undefined;
};

export const useBoard = ({ author, title }: Params): Board | undefined | null => {
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
