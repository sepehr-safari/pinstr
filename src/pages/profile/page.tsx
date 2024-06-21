import { BoardsByAuthor, FiltersNavbar, ProfileBanner, ProfileCard } from '@/features';
import { MainContainer } from '@/shared/layouts';

export const Page = () => {
  return (
    <>
      <ProfileBanner />

      <div className="relative gap-y-6 gap-x-8 flex flex-col">
        {/* <StickyContainer>

<div className="px-4 xl:px-0">
</div>
</StickyContainer> */}

        <ProfileCard />

        <div className="mx-auto px-4">
          <FiltersNavbar />
        </div>

        <MainContainer>
          <BoardsByAuthor />
        </MainContainer>
      </div>
    </>
  );
};
