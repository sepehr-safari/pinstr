import { BoardsByAuthor, ProfileCard } from '@/ui/components';
import { FiltersNavbar } from '@/ui/components/Navbars';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

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
