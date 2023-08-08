import { BoltIcon, HandThumbUpIcon } from '@heroicons/react/20/solid';

const people = [
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    role: 'Co-Founder / CTO',
    imageUrl: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];

export default function PeopleGrid({ boardName }: { boardName: string }) {
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
        className="mx-auto mt-14 grid grid-cols-2 gap-x-8 gap-y-14 text-center md:grid-cols-3 lg:mx-0 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {people.map((person, index) => (
          <li
            key={index}
            className="relative group rounded-md pb-4 transition-all duration-300 hover:shadow-md hover:bg-gray-50"
          >
            <div className="absolute top-0 w-full">
              <img
                className="w-full h-20 bg-gray-200 rounded-md object-center object-cover transition-all duration-300 group-hover:rounded-b-none"
                src={
                  'https://source.unsplash.com/random/?landscape&sig=' +
                  Math.random()
                }
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col pt-10">
              <div className="mx-auto rounded-full bg-gray-300 z-[1]">
                <img
                  className="aspect-1 w-20 h-20 rounded-full object-cover object-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
                  src={person.imageUrl}
                  alt=""
                />
              </div>
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              <button
                tabIndex={-1}
                className="mx-auto mt-2 rounded-md w-3/4 py-2 text-xs font-bold bg-gray-100 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Follow
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
