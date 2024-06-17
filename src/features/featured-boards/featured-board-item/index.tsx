import { Link } from 'react-router-dom';

import { ellipsis } from '@/shared/utils';

import { MemoizedBoardItem } from '@/features';

import { useFeaturedBoardItem } from './hooks';
import { FeaturedBoardItemProps } from './types';

export const FeaturedBoardItem = ({ board }: FeaturedBoardItemProps) => {
  const { author } = useFeaturedBoardItem({ board });

  return (
    <div className="flex flex-col gap-2">
      {author ? (
        // <AuthorOverview author={author} boosted />
        <Link
          to={`/p/${board.event.author.npub}`}
          state={{ backgroundLocation: location }}
          className="text-xs font-semibold focus:border-none focus:outline-none hover:underline"
        >
          {ellipsis(board.event.author.profile?.name || '', 30)}
        </Link>
      ) : (
        <div className="leading-none">
          <span className="text-xs text-gray-500 ">{`🚀 Boosted by Anonymouse`}</span>
        </div>
      )}

      <MemoizedBoardItem board={board} />
    </div>
  );
};
