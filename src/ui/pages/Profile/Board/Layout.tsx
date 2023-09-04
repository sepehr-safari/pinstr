import { Outlet } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';

import { BoardSummary, Comments, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  const { commentsParam } = useCommentsParams();

  return (
    <>
      <StickyContainer className="order-1">
        <ProfileCard />
        <BoardSummary />
      </StickyContainer>

      <MainContainer className="order-3 xl:order-2">
        <Outlet />
      </MainContainer>

      {commentsParam != null && (
        <StickyContainer className="order-2 xl:order-3 xl:max-w-sm 2xl:max-w-xs">
          <Comments />
        </StickyContainer>
      )}
    </>
  );
};
