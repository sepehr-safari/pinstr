import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { useSelectBoard } from './hooks';

import { loader } from '@/shared/utils';

export const SelectBoard = () => {
  const { boards, hasMore, loadMore, searchInput, selectBoard, setSearchInput, isFetching } =
    useSelectBoard();

  return (
    <>
      <div>
        <div className="flex flex-1 items-center justify-center w-full border-b">
          <div className="w-full px-8 py-4">
            <label htmlFor="search-boards" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <input
                type="search"
                id="search-boards"
                name="search-boards"
                autoComplete="off"
                className="block w-full rounded-md border-0 bg-opacity-30 bg-white py-2 pl-10 pr-3 text-xs text-gray-900 ring-1 ring-inset ring-gray-900/20 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-gray-900/50"
                placeholder="Search in your boards"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </div>
          </div>
        </div>
        <ul role="list" className="mt-4 px-6 grid grid-cols-2 gap-4">
          {(boards || [])
            .filter((board) => board.title.toLowerCase().includes(searchInput.toLowerCase()))
            .map((board) => (
              <li key={board.event.id} className="flow-root">
                <div className="relative group flex items-center gap-2 pr-2 rounded-xl focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-200">
                    <img
                      className="h-12 w-12 rounded-lg duration-300 ease-in-out group-hover:h-14 group-hover:w-14"
                      src={loader(board.image, {
                        w: 96,
                        h: 96,
                      })}
                      alt={board.title}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <button
                        type="button"
                        className="text-start"
                        onClick={() => selectBoard(board)}
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        <span>{board.title}</span>
                      </button>
                    </h3>
                  </div>
                </div>
              </li>
            ))}
        </ul>

        <button
          className="mt-4 mx-auto block text-gray-700 bg-gray-100 text-xs px-4 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
          onClick={() => loadMore()}
        >
          Load More
        </button>

        <button
          onClick={() => loadMore()}
          disabled={!hasMore || isFetching}
          className="mt-20 mx-auto block text-gray-700 bg-gray-100 text-xs px-4 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
        >
          {isFetching ? 'Loading...' : hasMore ? 'Load More' : 'Nothing more to load'}
        </button>
      </div>
    </>
  );
};
