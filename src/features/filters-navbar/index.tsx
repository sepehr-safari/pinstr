import { useFiltersParams } from '@/shared/hooks/common';

import { CategoryFilterMenu, FormatFilterMenu } from '@/features';

export const FiltersNavbar = () => {
  const { category, format } = useFiltersParams();

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center items-center xl:justify-start">
        {/* <div className="flex-1 max-w-xs">
          <AuthorGroupMenu />
        </div> */}
        <div className="flex-1 min-w-[20rem]">
          <CategoryFilterMenu
            selected={category.value}
            setSelected={(item) => category.set(item.title)}
          />
        </div>
        <div className="flex-1 min-w-[20rem]">
          <FormatFilterMenu
            selected={format.value}
            setSelected={(item) => format.set(item.title)}
          />
        </div>
      </div>
    </>
  );
};
