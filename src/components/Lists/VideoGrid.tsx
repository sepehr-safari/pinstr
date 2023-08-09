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
          className="relative rounded-md group transition-all hover:shadow-md hover:bg-gray-50"
        >
          <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-100 group-hover:rounded-b-none">
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
          <p className="mt-2 block truncate text-sm font-medium text-gray-900 transition-transform group-hover:translate-x-2">
            {file.title}
          </p>
          <button
            tabIndex={-1}
            type="button"
            className="mt-2 w-full text-xs text-gray-500 font-light px-4 py-2 bg-gray-200 rounded-b-md opacity-0 transition-all translate-y-1 hover:shadow-md hover:bg-gray-300 hover:text-gray-700 group-hover:opacity-100 group-hover:translate-y-0"
          >
            View Details
          </button>
        </li>
      ))}
    </ul>
  );
}
