import { useFiltersParams } from '@/logic/hooks';
import { BoardTypeMenu, CategoryMenu } from '@/ui/components/Menus';

export const FiltersNavbar = () => {
  const { category, type } = useFiltersParams();

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center items-center xl:justify-start">
        {/* <div className="flex-1 max-w-xs">
          <AuthorGroupMenu />
        </div> */}
        <div className="flex-1 max-w-sm min-w-[20rem]">
          <CategoryMenu selected={category.value} setSelected={category.set} />
        </div>
        <div className="flex-1 max-w-sm min-w-[20rem]">
          <BoardTypeMenu selected={type.value} setSelected={type.set} />
        </div>
      </div>
    </>
  );
};
