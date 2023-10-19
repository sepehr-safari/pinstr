import { NDKEvent, NDKFilter, NDKKind } from '@nostr-dev-kit/ndk';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStore } from '../store';
import { NDKBoard } from '../types';
import { isMutedBoard, parseBoardFromEvent } from '../utils';

type Params = {
  author?: string;
  title?: string;
  category?: string;
  format?: string;
  tag?: string;
  muteList?: string[];
  enabled?: boolean;
};

export const useBoards = ({
  author,
  category,
  format,
  muteList,
  tag,
  title,
  enabled = true,
}: Params) => {
  const isSubscribed = useRef(false);

  const [boards, setBoards] = useState<NDKBoard[]>([]);
  const [eose, setEose] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ndk = useLocalStore((state) => state.ndk);

  const subscribe = useCallback(
    async (until?: number | undefined, closeOnEose: boolean = false) => {
      if (!ndk) return;

      const filter: NDKFilter = { kinds: [33889 as NDKKind], limit: 50, until };
      if (!!author) filter['authors'] = [author];
      if (!!title) filter['#d'] = [title];
      if (!!category) filter['#c'] = [category];
      if (!!format) filter['#f'] = [format];
      if (!!tag) filter['#t'] = [tag];

      const subscription = ndk.subscribe([filter], { closeOnEose });
      let hasBoards = false;

      subscription.on('event', (event: NDKEvent) => {
        const parsedBoard = parseBoardFromEvent(event);

        if (isMutedBoard(parsedBoard, muteList)) return;
        hasBoards = true;

        const author = ndk.getUser({ hexpubkey: event.pubkey });
        author.fetchProfile().then(() => {
          setBoards((prev) => [...prev, { ...parsedBoard, author }]);
        });
      });

      subscription.on('eose', () => {
        if (hasBoards == false) {
          setHasMore(false);
        }

        setEose(true);
      });
    },
    [ndk, boards, author, title, category, format, tag, muteList, setBoards, setEose, setHasMore]
  );

  const loadMore = useCallback(() => {
    subscribe(boards[boards.length - 1].timestamp - 1, true);
  }, [subscribe, boards]);

  const isLoading = !eose && boards.length == 0;
  const isFetching = !eose && boards.length > 0;
  const isDone = eose && boards.length > 0;
  const isEmpty = eose && boards.length == 0;

  const status = isLoading
    ? 'loading'
    : isFetching
    ? 'fetching'
    : isDone
    ? 'done'
    : isEmpty
    ? 'empty'
    : 'error';

  useEffect(() => {
    if (!enabled) return;
    if (isSubscribed.current == true) return;

    isSubscribed.current = true;

    subscribe();
  }, [subscribe, enabled]);

  return { boards, loadMore, status, hasMore };
};
