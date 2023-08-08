import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';

const people = [
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];

export default function InCard({ boardName }: { boardName: string }) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <div className="gap-8 flex flex-col lg:flex-row">
          <div className="mx-auto lg:mx-0">
            <div className="w-64 aspect-w-4 aspect-h-3 rounded-md bg-gray-200">
              <img
                src={
                  'https://source.unsplash.com/random/?developer&sig=' +
                  Math.random()
                }
                alt=""
                className="w-full h-full object-cover object-center rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="mx-auto text-xl font-bold tracking-tight text-gray-900 xl:text-2xl lg:mx-0">
              {boardName}
            </h2>

            <div className="mx-auto mt-2 inline-flex gap-2 text-xs font-light text-black/30 lg:mx-0">
              <span>Nostr Profiles (Kind: 30000)</span>
              <span>|</span>
              <span>Technology</span>
            </div>

            <p className="mt-6 text-sm font-light text-gray-500 text-justify">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our
              clients.
            </p>

            <div className="mx-auto mt-4 flex gap-8 lg:mx-0 lg:mt-auto">
              <button
                tabIndex={-1}
                className="inline-flex justify-center items-center rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                <span className="">Like</span>
                <HandThumbUpIcon
                  className="ml-2 -mr-1 h-4 w-4"
                  aria-hidden="true"
                />
              </button>
              <button
                tabIndex={-1}
                className="inline-flex justify-center items-center rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                <span className="">ZAP</span>
                <BoltIcon className="ml-2 -mr-1 h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2"></div>
      </div>

      <ul
        role="list"
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
      >
        {people.map((person, index) => (
          <li
            key={index}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-4">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {person.name}
                  </h3>
                </div>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {person.email}
                </p>
                <p className="mt-1 truncate text-xs text-gray-400">
                  npub1frhbna893gbi2983yfjjabkdfig8ry2083hurbwdfboh
                </p>
              </div>
              <img
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center bg-gray-300"
                src={person.imageUrl}
                alt=""
              />
            </div>
            <div className="p-4 text-justify font-light">
              <span className="text-xs">
                a dynamic group of individuals who are passionate about what we
                do and dedicated to delivering the best results for our clients
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
