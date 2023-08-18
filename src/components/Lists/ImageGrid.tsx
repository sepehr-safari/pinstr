import { useState } from 'react';

import { DetailsSlideover } from '@/components';

const images = [
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
];

export default function ImageGrid() {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <ul
      role="list"
      className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-x-8 2xl:grid-cols-3 3xl:grid-cols-4"
    >
      {images.map((image, index) => (
        <li
          key={index}
          className="p-2 group relative rounded-lg hover:bg-gray-50 ease-in-out duration-500 hover:shadow-md"
        >
          <div className="ease-in-out duration-700">
            <div className="aspect-w-5 aspect-h-4 block w-full overflow-hidden rounded-md bg-gray-100">
              <img
                src={image.source}
                alt=""
                className="object-cover object-center hover:opacity-75 hover:cursor-zoom-in"
              />
            </div>
          </div>

          <p className="mt-4 block truncate text-sm font-medium text-gray-900 ease-in-out duration-700">
            {image.title}
          </p>

          <div className="w-full">
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
                images.length > currentIndex + 1
                  ? currentIndex + 1
                  : currentIndex
              )
            }
            onPrevious={() =>
              setShownDetailsIndex((currentIndex) =>
                currentIndex > 0 ? currentIndex - 1 : currentIndex
              )
            }
            details={image}
          >
            <div className="max-w-sm mx-auto">
              <div className="ease-in-out duration-700">
                <div className="aspect-w-5 aspect-h-4 block w-full overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={image.source}
                    alt=""
                    className="object-cover hover:opacity-75 hover:cursor-zoom-in"
                  />
                </div>
              </div>
            </div>
          </DetailsSlideover>
        </li>
      ))}
    </ul>
  );
}
