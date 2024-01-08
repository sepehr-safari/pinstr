import { AuthorOverview, MemoizedBoardItem } from '@/features';

import { useFeaturedBoardItem } from './hooks';
import { FeaturedBoardItemProps } from './types';

export const FeaturedBoardItem = ({ board }: FeaturedBoardItemProps) => {
  const { author } = useFeaturedBoardItem({ board });

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
