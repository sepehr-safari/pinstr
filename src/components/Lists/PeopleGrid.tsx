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
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {boardName}
      </h2>
      <p className="mt-4 text-gray-500">
        We’re a dynamic group of individuals who are passionate about what we do
        and dedicated to delivering the best results for our clients.
      </p>
      <ul
        role="list"
        className="mx-auto mt-10 grid grid-cols-2 gap-x-8 gap-y-14 text-center md:grid-cols-3 lg:mx-0 xl:grid-cols-4 2xl:grid-cols-5"
      >
        {people.map((person) => (
          <>
            <li
              key={person.name}
              className="relative group rounded-md pb-4 transition-shadow duration-300 hover:shadow-md"
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
                    className="aspect-1 w-20 h-20 rounded-full object-cover object-center transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-lg"
                    src={person.imageUrl}
                    alt=""
                  />
                </div>
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                <button
                  type="button"
                  className="mx-auto mt-2 rounded-md w-3/4 py-2 text-xs font-bold bg-gray-100 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Follow
                </button>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
