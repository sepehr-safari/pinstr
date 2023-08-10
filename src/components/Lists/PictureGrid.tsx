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
        <li
          key={file.source}
          className="group relative rounded-md hover:bg-gray-50 transition-all ease-in-out duration-500 hover:shadow-md"
        >
          <div className="transition-transform ease-in-out duration-700 group-hover:scale-95">
            <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded bg-gray-100">
              <img
                src={file.source}
                alt=""
                className="object-cover hover:opacity-75 hover:cursor-zoom-in"
              />
            </div>
          </div>

          <p className="mt-2 block truncate text-sm font-medium text-gray-900 transition-all ease-in-out duration-700 group-hover:px-4">
            {file.title}
          </p>

          <div className="w-full p-2 pt-0">
            <button
              tabIndex={-1}
              type="button"
              className="mt-4 w-full text-xs text-gray-500 font-light px-4 py-2 bg-gray-200 rounded transition-all ease-in-out duration-500 opacity-0 translate-y-2 hover:bg-gray-300 hover:text-gray-700 group-hover:opacity-100 group-hover:translate-y-0"
            >
              View Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
