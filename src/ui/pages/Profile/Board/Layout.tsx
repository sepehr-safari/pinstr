import { Outlet } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';

import { BoardSummary, CommentsCard, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  const { commentsParam } = useCommentsParams();

  return (
    <>
      <StickyContainer>
        <ProfileCard />
        <BoardSummary />
        {commentsParam != null && <CommentsCard />}
      </StickyContainer>

      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};
