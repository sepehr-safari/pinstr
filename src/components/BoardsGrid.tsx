import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';

const boards = [
  {
    id: 1,
    name: 'Favorite Movies',
    author: 'sepehr',
    imageSrc: 'https://source.unsplash.com/random/?cinema',
  },
  {
    id: 2,
    name: 'Best Pizza Flavors',
    author: 'fiatjaf',
    imageSrc: 'https://source.unsplash.com/random/?pizza',
  },
  {
    id: 3,
    name: 'Encyclopedia of Rare and Special Edition Cars',
    author: 'Merdellow',
    imageSrc: 'https://source.unsplash.com/random/?rare+cars',
  },
  {
    id: 4,
    name: 'Top Rock Bands',
    author: 'Sepehr',
    imageSrc: 'https://source.unsplash.com/random/?rock+band',
  },
  {
    id: 5,
    name: 'Race Cars of Yesteryear',
    author: 'Merdellow',
    imageSrc: 'https://source.unsplash.com/random/?old+race+cars',
  },
  {
    id: 6,
    name: 'NIP-57 Zap supported Lightning Wallets',
    author: 'Derek Ross',
    imageSrc: 'https://source.unsplash.com/random/?bitcoin',
  },
  {
    id: 7,
    name: 'Top 10 Python Libraries',
    author: 'Sepehr',
    imageSrc: 'https://source.unsplash.com/random/?python',
  },
  {
    id: 8,
    name: 'Grammy Winners of 2010',
    author: 'Merdellow',
    imageSrc: 'https://source.unsplash.com/random/?grammy',
  },
  {
    id: 9,
    name: 'Nostr Geek Developers',
    author: 'Pablo',
    imageSrc: 'https://source.unsplash.com/random/?developer',
  },
  {
    id: 10,
    name: 'Top Nostr Designers',
    author: 'Gigi',
    imageSrc: 'https://source.unsplash.com/random/?designer',
  },
];

export default function BoardsGrid() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-md sm:max-w-none overflow-hidden p-4 sm:px-6 sm:pt-6 mb-12">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-x-6 sm:gap-y-10">
          {boards.map((board) => (
            <a key={board.id} href="#" className="group">
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
                  <p className="text-xs text-gray-500 hover:underline">
                    {board.author}
                  </p>
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
          ))}
        </div>
      </div>
    </div>
  );
}
