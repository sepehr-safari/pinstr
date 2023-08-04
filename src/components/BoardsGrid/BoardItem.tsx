import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';

import AuthorOverview from './AuthorOverview';

const BoardItem = ({ board }: { board: any }) => {
  return (
    <>
      <a className="group">
        <div className="relative aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-md bg-gray-100">
          <div className="absolute left-0 right-0 top-0 bottom-0 z-[1] bg-black opacity-0 duration-200 group-hover:opacity-20" />
          <img
            src={board.imageSrc}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 hover:underline">
              {board.name}
            </h3>

            <AuthorOverview />
          </div>
          <div className="ml-4 mt-[2px] flex">
            <button className="flex text-xs font-bold text-gray-500 hover:text-gray-700">
              <HandThumbUpIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">17</span>
            </button>
            <button className="ml-4 flex text-xs font-bold text-gray-500 hover:text-gray-700">
              <BoltIcon className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1">9.4k</span>
            </button>
          </div>
        </div>
      </a>
    </>
  );
};

export default BoardItem;
