import { Outlet } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';

import { BoardSummary, CommentsCard, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  const { commentsParam } = useCommentsParams();

  return (
    <>
      <div className="relative gap-y-6 gap-x-8 flex flex-col xl:flex-row xl:p-8">
        <StickyContainer>
          <ProfileCard />
          <BoardSummary />
          {commentsParam != null && <CommentsCard />}
        </StickyContainer>

        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
};
