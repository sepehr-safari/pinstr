import BoardItem from './BoardItem';

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
    imageSrc: 'https://source.unsplash.com/random/?race+cars',
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
      <div className="mx-auto max-w-md sm:max-w-none overflow-hidden p-4 sm:p-6 mb-12">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-x-6 sm:gap-y-10">
          {boards.map((board) => (
            <BoardItem board={board} key={board.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
