import { Outlet } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';

import { BoardSummary, Comments, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  const { commentsParam } = useCommentsParams();

  return (
    <>
      <StickyContainer>
        <ProfileCard />
        <BoardSummary />
      </StickyContainer>

      <MainContainer>
        <Outlet />
      </MainContainer>

      {commentsParam != null && (
        <StickyContainer>
          <Comments />
        </StickyContainer>
      )}
    </>
  );
};
