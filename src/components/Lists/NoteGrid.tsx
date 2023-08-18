import { useState } from 'react';

import { DetailsSlideover } from '@/components';

const people = [
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
  {
    name: 'Michael Foster',
    email: 'michael@foster.com',
    image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
  },
];

export default function NoteGrid() {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
      >
        {people.map((person, index) => (
          <li
            key={index}
            className="group col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-300 hover:shadow-md"
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
              </div>
              <img
                className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-center bg-gray-300"
                src={person.image}
                alt=""
              />
            </div>
            <div className="p-4 text-justify font-light">
              <span className="text-xs line-clamp-4 translate-y-2 group-hover:translate-y-0 ease-in-out duration-700">
                a dynamic group of individuals who are passionate about what we
                do and dedicated to delivering the best results for our clients
                a dynamic group of individuals who are passionate about what we
                do and dedicated to delivering the best results for our clients
                a dynamic group of individuals who are passionate about what we
                do and dedicated to delivering the best results for our clients
              </span>
            </div>

            <div className="flex w-full opacity-0 ease-in-out duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              <a
                href="https://primal.net/note1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
              >
                Open with Primal
              </a>

              <button
                className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => setShownDetailsIndex(index)}
              >
                View details
              </button>
            </div>

            <DetailsSlideover
              isShown={shownDetailsIndex === index}
              onClose={() => setShownDetailsIndex(-1)}
              onNext={() =>
                setShownDetailsIndex((currentIndex) =>
                  people.length > currentIndex + 1
                    ? currentIndex + 1
                    : currentIndex
                )
              }
              onPrevious={() =>
                setShownDetailsIndex((currentIndex) =>
                  currentIndex > 0 ? currentIndex - 1 : currentIndex
                )
              }
              details={person}
            >
              <div className="max-w-sm mx-auto">
                <div className="rounded-lg shadow-md border bg-white">
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {person.name}
                      </h3>
                    </div>
                    <span className="text-xs text-gray-500">
                      {person.email}
                    </span>
                  </div>

                  <div className="p-4 border-t text-xs text-gray-500">
                    <p>
                      a dynamic group of individuals who are passionate about
                      what we do and dedicated to delivering the best results
                      for our clients a dynamic group of individuals who are
                      passionate about what we do and dedicated to delivering
                      the best results for our clients a dynamic group of
                      individuals who are passionate about what we do and
                      dedicated to delivering the best results for our clients
                    </p>
                  </div>

                  <div className="border-t flex w-full">
                    <a
                      href="https://primal.net/note1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
                    >
                      Open with Primal
                    </a>
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
