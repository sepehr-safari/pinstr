import {
  Navbar,
  KindsMenu,
  AuthorMenu,
  BoardsGrid,
  Footer,
} from '@/components';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <AuthorMenu />
        <KindsMenu />
      </div>
      <BoardsGrid />
      <Footer />
    </>
  );
};

export default Home;
