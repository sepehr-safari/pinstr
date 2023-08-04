import AuthorMenu from './AuthorMenu';
import Categories from './Categories';
import KindsMenu from './KindsMenu';

const FiltersNav = () => {
  return (
    <>
      <div className="mb-2 px-4 pt-4 flex flex-wrap gap-4 sm:px-6">
        <AuthorMenu />
        <Categories />
        <div className="ml-auto">
          <KindsMenu />
        </div>
      </div>
    </>
  );
};

export default FiltersNav;
