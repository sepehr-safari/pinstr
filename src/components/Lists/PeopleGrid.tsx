import { PlusIcon } from '@heroicons/react/20/solid';

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

export default function PeopleGrid() {
  return (
    <>
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-2 gap-x-8 gap-y-14 text-center md:grid-cols-3 lg:mx-0 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {people.map((person, index) => (
          <li
            key={index}
            className="relative group rounded-lg pb-4 transition-all duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <div className="absolute top-0 w-full">
              <img
                className="w-full h-20 bg-gray-200 rounded-lg object-center object-cover transition-all duration-500 group-hover:rounded-b-none"
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
                  className="aspect-1 w-20 h-20 rounded-full object-cover object-center transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
                  src={person.imageUrl}
                  alt=""
                />
              </div>
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {person.name}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{person.role}</p>
              <div className="mt-4 mx-auto w-full">
                <button
                  tabIndex={-1}
                  className="inline-flex justify-center items-center rounded-full bg-gray-100 px-12 py-2 text-xs font-semibold text-gray-500 ring-1 ring-gray-300 hover:shadow-md hover:text-gray-800"
                >
                  <PlusIcon className="-ml-1 w-4 h-4" />
                  <span className="ml-1">Follow</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
