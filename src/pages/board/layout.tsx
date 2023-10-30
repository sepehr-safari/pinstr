import { Outlet } from 'react-router-dom';

import { BoardSummary, ProfileCard } from '@/features';
import { MainContainer, StickyContainer } from '@/shared/layouts';

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
