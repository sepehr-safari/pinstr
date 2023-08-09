const files = [
  {
    title: 'Margherita',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  {
    title: 'Pepperoni',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  {
    title: 'Hawaiian',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  {
    title: 'Meat Lovers',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  {
    title: 'Veggie Lovers',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  {
    title: 'Supreme',
    size: '3.9 MB',
    source: 'https://source.unsplash.com/random/?pizza&sig=' + Math.random(),
  },
  // More files...
];

export default function PictureGrid() {
  return (
    <ul
      role="list"
      className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3"
    >
      {files.map((file) => (
        <li key={file.source} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100">
            <img
              src={file.source}
              alt=""
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              tabIndex={-1}
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {file.title}</span>
            </button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
            {file.title}
          </p>
        </li>
      ))}
    </ul>
  );
}
