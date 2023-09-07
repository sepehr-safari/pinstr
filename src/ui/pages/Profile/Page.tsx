import { BoardsByAuthor, ProfileCard } from '@/ui/components';
import { FiltersNavbar } from '@/ui/components/Navbars';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Page = () => {
  return (
    <>
      <StickyContainer>
        <ProfileCard />

        <div className="px-4 xl:px-0">
          <FiltersNavbar />
        </div>
      </StickyContainer>

      <MainContainer>
        <BoardsByAuthor />
      </MainContainer>
    </>
  );
};
