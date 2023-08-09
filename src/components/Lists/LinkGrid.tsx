import { ChevronRightIcon } from '@heroicons/react/20/solid';

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
  return (
    <>
      <ul
        role="list"
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
      >
        {urls.map((url, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition-shadow hover:shadow-md"
          >
            <div className="flex w-full items-center justify-between space-x-4 pr-4 group hover:cursor-pointer">
              <img
                className="h-20 w-20 flex-shrink-0 rounded-ss-md object-cover object-center bg-gray-300"
                src={url.imageUrl}
                alt=""
              />
              <div className="flex-1 truncate">
                <div className="truncate flex items-center justify-between">
                  <h3 className="w-full leading-10 truncate text-sm font-medium text-gray-900 hover:underline">
                    {url.name}
                  </h3>

                  <button
                    tabIndex={-1}
                    type="button"
                    className="translate-x-2 transition-all ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    <ChevronRightIcon className="ml-1 h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
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
          </li>
        ))}
      </ul>
    </>
  );
}
