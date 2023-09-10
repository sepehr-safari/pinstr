import { useFiltersParams } from '@/logic/hooks';

import { CategoryMenu, FormatMenu } from '@/ui/components/Menus';

export const FiltersNavbar = () => {
  const { category, format } = useFiltersParams();

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center items-center xl:justify-start">
        {/* <div className="flex-1 max-w-xs">
          <AuthorGroupMenu />
        </div> */}
        <div className="flex-1 sm:max-w-sm min-w-[20rem]">
          <CategoryMenu selected={category.value} setSelected={category.set} />
        </div>
        <div className="flex-1 sm:max-w-sm min-w-[20rem]">
          <FormatMenu selected={format.value} setSelected={format.set} />
        </div>
      </div>
    </>
  );
};
