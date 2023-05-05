import { PlusIcon } from '@heroicons/react/24/outline';

type NewBoardInputParams = {
  inputId: string;
  header: string;
};

const Header = ({ inputId, header }: NewBoardInputParams) => {
  return (
    <>
      <div className="flex justify-between items-center text-xs text-neutral-400 py-2 px-4">
        <span>{header}</span>
        <label htmlFor={inputId} className="btn btn-xs btn-square btn-ghost">
          <PlusIcon className="w-5 h-5" />
        </label>
      </div>
    </>
  );
};

export default Header;
