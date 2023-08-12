import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';

const urls = [
  {
    name: 'Alby',
    address: 'https://getalby.com',
    imageUrl:
      'https://source.unsplash.com/random/?bitcoin&sig=' + Math.random(),
  },
  {
    name: 'Zebedee',
    address: 'https://zebedee.io',
    imageUrl:
      'https://source.unsplash.com/random/?bitcoin&sig=' + Math.random(),
  },
  {
    name: 'Wallet of Satoshi',
    address: 'https://www.walletofsatoshi.com/',
    imageUrl: 'https://source.unsplash.com/random/?crypto&sig=' + Math.random(),
  },
  {
    name: 'BTCPay Server',
    address: 'https://btcpayserver.org',
    imageUrl:
      'https://source.unsplash.com/random/?payment&sig=' + Math.random(),
  },
  {
    name: 'Nostdress',
    address: 'https://github.com/believethehype/nostdress',
    imageUrl: 'https://source.unsplash.com/random/?wallet&sig=' + Math.random(),
  },
  {
    name: 'Geyser',
    address: 'https://geyser.fund',
    imageUrl:
      'https://source.unsplash.com/random/?payment&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    address: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];

export default function LinkGrid() {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
      >
        {urls.map((url, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-200 hover:shadow-md"
          >
            <button
              tabIndex={-1}
              type="button"
              onClick={() => setShownDetailsIndex(index)}
              className="flex w-full items-center group hover:cursor-pointer"
            >
              <img
                className="h-20 w-20 flex-shrink-0 rounded-ss-md object-cover object-center bg-gray-300"
                src={url.imageUrl}
                alt=""
              />
              <div className="flex-1 truncate px-4">
                <div className="truncate flex items-center translate-y-3 ease-in-out duration-500 group-hover:translate-y-0">
                  <h3 className="leading-10 truncate text-sm font-medium text-gray-900">
                    {url.name}
                  </h3>
                </div>
                <div className="w-full flex justify-end">
                  <div className="inline-flex items-center translate-x-2 opacity-0 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    <span className="text-xs font-light text-gray-500">
                      View Details
                    </span>
                    <ChevronRightIcon className="ml-1 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </button>
            <div className="p-4 flex flex-1 truncate font-light">
              <a
                tabIndex={-1}
                href={url.address}
                className="truncate flex items-center text-xs w-full text-blue-700 hover:underline hover:text-blue-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                {url.address}
              </a>
            </div>

            <DetailsSlideover
              isShown={shownDetailsIndex === index}
              onClose={() => setShownDetailsIndex(-1)}
              onNext={() =>
                setShownDetailsIndex((currentIndex) =>
                  urls.length > currentIndex + 1
                    ? currentIndex + 1
                    : currentIndex
                )
              }
              onPrevious={() =>
                setShownDetailsIndex((currentIndex) =>
                  currentIndex > 0 ? currentIndex - 1 : currentIndex
                )
              }
              details={url}
            >
              <div className="max-w-sm mx-auto">
                <div className="rounded-lg shadow-md bg-white">
                  <img
                    className="w-full object-cover object-center max-h-48 rounded-t-lg"
                    src={url.imageUrl}
                    alt=""
                  />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 truncate">
                      {url.address}
                    </p>
                  </div>
                </div>
              </div>
            </DetailsSlideover>
          </li>
        ))}
      </ul>
    </>
  );
}
