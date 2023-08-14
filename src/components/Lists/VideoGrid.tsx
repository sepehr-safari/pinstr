import { useState } from 'react';

import { DetailsSlideover } from '@/components';

const videos = [
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
];

export default function VideoGrid() {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <ul
      role="list"
      className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3"
    >
      {videos.map((video, index) => (
        <li
          key={index}
          className="p-2 group relative rounded-lg hover:bg-gray-50 ease-in-out duration-500 hover:shadow-md"
        >
          <div className="ease-in-out duration-700">
            <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-100">
              {video.isEmbedded ? (
                <iframe className="object-cover" src={video.source} />
              ) : (
                <video
                  controls
                  autoPlay={false}
                  preload="off"
                  className="object-cover"
                  src={video.source}
                />
              )}
            </div>
          </div>

          <p className="mt-4 block truncate text-sm font-medium text-gray-900 ease-in-out duration-700">
            {video.title}
          </p>

          <div className="w-full ">
            <button
              type="button"
              className="mt-4 w-full text-xs text-gray-700 font-medium px-4 py-2 bg-gray-200 rounded-md ease-in-out duration-500 opacity-0 translate-y-2 hover:bg-gray-300 hover:text-gray-900 group-hover:opacity-100 group-hover:translate-y-0"
              onClick={() => setShownDetailsIndex(index)}
            >
              View Details
            </button>
          </div>

          <DetailsSlideover
            isShown={shownDetailsIndex === index}
            onClose={() => setShownDetailsIndex(-1)}
            onNext={() =>
              setShownDetailsIndex((currentIndex) =>
                videos.length > currentIndex + 1
                  ? currentIndex + 1
                  : currentIndex
              )
            }
            onPrevious={() =>
              setShownDetailsIndex((currentIndex) =>
                currentIndex > 0 ? currentIndex - 1 : currentIndex
              )
            }
            details={video}
          >
            <div className="max-w-sm mx-auto">
              <div className="ease-in-out duration-700">
                <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-md bg-gray-100">
                  {video.isEmbedded ? (
                    <iframe className="object-cover" src={video.source} />
                  ) : (
                    <video
                      controls
                      autoPlay={false}
                      preload="off"
                      className="object-cover"
                      src={video.source}
                    />
                  )}
                </div>
              </div>
            </div>
          </DetailsSlideover>
        </li>
      ))}
    </ul>
  );
}
