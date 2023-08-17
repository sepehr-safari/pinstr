import { PlusIcon } from '@heroicons/react/20/solid';
import { Outlet } from 'react-router-dom';

import { Breadcrumb } from '@/components/Navbars';

export default function Profile() {
  return (
    <>
      <div className="relative">
        <div className="-mt-16 bg-gray-200 rounded-t-md">
          <img
            className="h-52 w-full object-cover object-center md:rounded-t-md xl:h-64"
            src="https://source.unsplash.com/random/?nature"
            alt="banner nature"
          />
        </div>

        <div className="mt-0 overflow-hidden bg-white shadow rounded-none w-full z-[1] xl:ml-12 xl:-mt-20 xl:w-72 xl:absolute xl:rounded-md">
          <div className="px-6 py-10 flex flex-col items-center">
            <img
              className="-mt-20 h-28 w-28 object-cover object-center rounded-full absolute z-[2] xl:static xl:mt-0"
              src="https://source.unsplash.com/random/?avatar"
              alt="avatar"
            />

            <span className="mt-12 font-bold xl:mt-4">fiatjaf</span>
            <span className="mt-1 text-xs font-light text-gray-500">
              _@fiatjaf.com
            </span>
            <span className="mt-2 text-sm font-light text-gray-500 text-center">
              dynamic group of individuals who are passionate about what we do
              and dedicated
            </span>

            <button className="mt-4 inline-flex justify-center items-center rounded-full bg-gray-800 px-8 py-3 text-xs font-semibold text-white shadow-sm hover:opacity-80">
              <PlusIcon className="-ml-1 w-4 h-4" />
              <span className="ml-1">Follow</span>
            </button>

            <a
              href={`https://primal.net/${undefined}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-xs font-bold text-gray-400 hover:text-gray-600 hover:underline"
            >
              Open with Primal
            </a>
          </div>
        </div>

        <div className="w-full bg-gray-100 px-6 pb-16 pt-8 xl:pl-[24rem] xl:pr-12">
          <div className="pb-8">
            <Breadcrumb />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
