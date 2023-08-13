import { useState } from 'react';

import { AuthorGroupMenu, CategoryMenu, KindMenu } from '@/components/Menus';

import { MenuItem } from '@/components/Menus/MenuTemplate.types';

export default function FiltersNavbar() {
  const [category, setCategory] = useState<MenuItem | null>(null);
  const [kind, setKind] = useState<MenuItem | null>(null);

  return (
    <>
      <div className="mb-2 px-4 pt-4 flex flex-wrap gap-4 sm:px-6">
        <div className="w-32">
          <AuthorGroupMenu />
        </div>
        <div className="w-full order-last md:w-72 md:order-none lg:w-80">
          <CategoryMenu category={category} setCategory={setCategory} />
        </div>
        <div className="ml-auto w-64">
          <KindMenu kind={kind} setKind={setKind} />
        </div>
      </div>
    </>
  );
}
