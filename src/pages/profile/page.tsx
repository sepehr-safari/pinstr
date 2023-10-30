import { BoardsByAuthor, ProfileCard, FiltersNavbar } from '@/features';
import { StickyContainer, MainContainer } from '@/shared/layouts';

export const Page = () => {
  return (
    <>
      <div className="relative gap-y-6 gap-x-8 flex flex-col xl:flex-row xl:p-8">
        <StickyContainer>
          <ProfileCard />

          <div className="px-4 xl:px-0">
            <FiltersNavbar />
          </div>
        </StickyContainer>

        <MainContainer>
          <BoardsByAuthor />
        </MainContainer>
      </div>
    </>
  );
};
