import { Outlet } from 'react-router-dom';

import { BoardSummary, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  return (
    <>
      <StickyContainer>
        <ProfileCard />
        <BoardSummary />
      </StickyContainer>

      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};
