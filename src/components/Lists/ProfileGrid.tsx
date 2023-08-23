import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { Author, Board } from '@/types';

// const people = [
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
//   {
//     name: 'Michael Foster',
//     role: 'Co-Founder / CTO',
//     image: 'https://source.unsplash.com/random/?avatar&sig=' + Math.random(),
//   },
// ];

export const ProfileGrid = ({ board }: { board: Board }) => {
  const [shownDetailsIndex, setShownDetailsIndex] = useState(-1);

  let profile: Author;

  return (
    <>
      <ul
        role="list"
        className="mx-auto mt-14 grid grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((profilePin, index) => (
          <li
            key={index}
            className="relative group rounded-lg ease-in-out duration-500 hover:shadow-md hover:bg-gray-50"
          >
            <div className="absolute top-0 w-full">
              <img
                className="w-full h-24 bg-gray-200 text-gray-200 rounded-lg object-center object-cover ease-in-out duration-500 group-hover:rounded-b-none"
                src={
                  'https://source.unsplash.com/random/?landscape&sig=' +
                  Math.random()
                }
                alt={profile.displayName + ' banner'}
              />
            </div>
            <div className="flex flex-1 flex-col pt-16">
              <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
                <img
                  className="aspect-1 w-24 h-24 rounded-full object-cover object-center ease-in-out duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-md"
                  src={profile.picture}
                  alt={profile.displayName + ' avatar'}
                />
              </div>
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                {profile.displayName}
              </h3>
              <p className="text-sm leading-6 text-gray-600">{profile.about}</p>
              <div className="mt-6 mx-auto flex flex-col">
                <button className="flex justify-center items-center rounded-full bg-gray-200 px-6 py-2.5 text-xs font-semibold text-gray-500 ease-in-out duration-300 hover:shadow hover:text-gray-700 hover:bg-gray-300">
                  <PlusIcon className="-ml-1 w-4 h-4" />
                  <span className="ml-1">Follow</span>
                </button>
              </div>
            </div>

            <div className="mt-8 flex w-full border-t opacity-0 -translate-y-1 ease-in-out duration-500 group-hover:opacity-100 group-hover:translate-y-0">
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
                  board.pins.length > currentIndex + 1
                    ? currentIndex + 1
                    : currentIndex
                )
              }
              onPrevious={() =>
                setShownDetailsIndex((currentIndex) =>
                  currentIndex > 0 ? currentIndex - 1 : currentIndex
                )
              }
              pin={profilePin}
              headers={board.headers}
            >
              <div className="max-w-sm mx-auto">
                <div className="relative group rounded-lg shadow-md bg-white">
                  <div className="absolute top-0 w-full">
                    <img
                      className="w-full h-24 bg-gray-200 text-gray-200 rounded-lg object-center object-cover rounded-b-none"
                      src={
                        'https://source.unsplash.com/random/?landscape&sig=' +
                        Math.random()
                      }
                      alt={profile.displayName + ' banner'}
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-16">
                    <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
                      <img
                        className="aspect-1 w-24 h-24 rounded-full object-cover object-center"
                        src={profile.picture}
                        alt={profile.displayName + ' avatar'}
                      />
                    </div>
                    <h3 className="mt-4 text-center text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {profile.displayName}
                    </h3>
                    <p className="text-sm text-center leading-6 text-gray-600">
                      {profile.about}
                    </p>
                  </div>

                  <div className="mt-6 flex w-full border-t">
                    <a
                      href={`https://primal.net/${profile.npub}`}
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
                      <PlusIcon className="-ml-1 w-4 h-4" />
                      <span className="ml-1">Follow</span>
                    </button>
                  </div>
                </div>
              </div>
            </DetailsSlideover>
          </li>
        ))}
      </ul>
    </>
  );
};
