import { Outlet } from 'react-router-dom';

import { BoardSummary, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Layout = () => {
  return (
    <>
      <div className="relative gap-y-6 gap-x-8 flex flex-col xl:flex-row xl:p-8">
        <StickyContainer>
          <ProfileCard />
          <BoardSummary />
        </StickyContainer>

        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </>
  );
};
