import { CategoryMenu, KindMenu, AuthorGroupMenu } from '@/components';

export default function FiltersNavbar() {
  return (
    <>
      <div className="mb-2 px-4 pt-4 flex flex-wrap gap-4 sm:px-6">
        <div className="w-32">
          <AuthorGroupMenu />
        </div>
        <div className="w-full order-last md:w-72 md:order-none lg:w-80">
          <CategoryMenu />
        </div>
        <div className="ml-auto w-64">
          <KindMenu />
        </div>
      </div>
    </>
  );
}
