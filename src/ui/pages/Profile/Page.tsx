import { BoardsByAuthor, ProfileCard } from '@/ui/components';
import { MainContainer, StickyContainer } from '@/ui/components/ProfileContainers';

export const Page = () => {
  return (
    <>
      <StickyContainer>
        <ProfileCard />
      </StickyContainer>

      <MainContainer>
        <BoardsByAuthor />
      </MainContainer>
    </>
  );
};
