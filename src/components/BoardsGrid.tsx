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
    imageSrc: 'https://source.unsplash.com/random/?rare,cars',
  },
  {
    id: 4,
    name: 'Top Rock Bands',
    author: 'Sepehr',
    imageSrc: 'https://source.unsplash.com/random/?rockband',
  },
  {
    id: 5,
    name: 'Race Cars of Yesteryear',
    author: 'Merdellow',
    imageSrc: 'https://source.unsplash.com/random/?race,cars,old',
  },
  {
    id: 6,
    name: 'NIP-57 Zap supported Lightning Wallets',
    author: 'Derek Ross',
    imageSrc: 'https://source.unsplash.com/random/?bitcoin',
  },
];

export default function BoardsGrid() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-md sm:max-w-none overflow-hidden p-4 sm:px-6 sm:pt-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-x-6 sm:gap-y-10">
          {boards.map((board) => (
            <a key={board.id} href="#" className="group">
              <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                <img
                  src={board.imageSrc}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">
                {board.name}
              </h3>
              <p className="text-xs text-gray-500">{board.author}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
