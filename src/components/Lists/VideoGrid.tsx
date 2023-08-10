const files = [
  {
    title: 'Embedded Video From Youtube',
    source: 'https://www.youtube.com/embed/GitxraPZ8dM',
    isEmbedded: true,
  },
  {
    title: 'Video With Direct Link',
    source: 'https://void.cat/d/UMiCovzyaZKUv2FYwhCRCo.mp4',
    isEmbedded: false,
  },
  {
    title: 'Video Name Here',
    source: 'https://www.youtube.com/embed/Zwd_8Jy7b-c',
    isEmbedded: true,
  },
  {
    title: 'Video Name Here',
    source: 'https://www.youtube.com/embed/Z2_OJWthxbA',
    isEmbedded: true,
  },
  {
    title: 'Video Name Here',
    source: 'https://www.youtube.com/embed/G0cfysoyOU4',
    isEmbedded: true,
  },
  {
    title: 'Video Name Here',
    source: 'https://www.youtube.com/embed/-mPd-Eoiu08',
    isEmbedded: true,
  },
  // More files...
];

export default function VideoGrid() {
  return (
    <ul
      role="list"
      className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3"
    >
      {files.map((file) => (
        <li
          key={file.source}
          className="group relative rounded-lg hover:bg-gray-50 transition-all ease-in-out duration-500 hover:shadow-md"
        >
          <div className="transition-transform ease-in-out duration-700 group-hover:scale-95">
            <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-100">
              {file.isEmbedded ? (
                <iframe className="object-cover" src={file.source} />
              ) : (
                <video
                  controls
                  autoPlay={false}
                  preload="off"
                  className="object-cover"
                  src={file.source}
                />
              )}
            </div>
          </div>

          <p className="mt-2 block truncate text-sm font-medium text-gray-900 transition-all ease-in-out duration-700 group-hover:px-4">
            {file.title}
          </p>

          <div className="w-full p-2 pt-0">
            <button
              tabIndex={-1}
              type="button"
              className="mt-4 w-full text-xs text-gray-500 font-light px-4 py-2 bg-gray-200 rounded-md transition-all ease-in-out duration-500 opacity-0 translate-y-2 hover:bg-gray-300 hover:text-gray-700 group-hover:opacity-100 group-hover:translate-y-0"
            >
              View Details
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
