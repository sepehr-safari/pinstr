import { NDKUser } from '@nostr-dev-kit/ndk';
import { useEffect } from 'react';

import { AuthorOverview, MemoizedBoardItem } from '@/features';

import { Spinner, Text } from '@/shared/components';
import { useAuthor } from '@/shared/hooks/queries';
import { Board } from '@/shared/types';

import { useFeaturedBoards } from './hooks';

const FeaturedBoardItem = ({ board }: { board: Board & { booster: string | undefined } }) => {
  const npub = board.booster ? new NDKUser({ pubkey: board.booster }).npub : undefined;
  const { author } = useAuthor(npub);

  return (
    <div className="flex flex-col gap-2">
      {author ? (
        <AuthorOverview author={author} boosted />
      ) : (
        <div className="leading-none">
          <span className="text-xs text-gray-500 ">{`🚀 Boosted by Anonymouse`}</span>
        </div>
      )}

      <MemoizedBoardItem board={board} />
    </div>
  );
};

export const FeaturedBoards = () => {
  const { boards, loadMore, hasMore, isEmpty, isPending, ref, inView, isFetching } =
    useFeaturedBoards();

  useEffect(() => {
    if (!isFetching && inView) {
      loadMore();
    }
  }, [isFetching, inView, loadMore]);

  return (
    <div className="overflow-hidden">
      <Text variant="h3">{`Featured Boards`}</Text>

      {isPending ? (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : isEmpty ? (
        <></>
      ) : (
        <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5">
          {boards.map((board) => (
            <FeaturedBoardItem key={board.event.id} board={board} />
          ))}
        </div>
      )}

      <button
        ref={ref}
        onClick={() => loadMore()}
        disabled={!hasMore || isFetching}
        className="mx-auto block text-transparent bg-transparent text-xs px-4 py-1"
      >
        {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
      </button>
    </div>
  );
};
