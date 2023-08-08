import { useParams } from 'react-router-dom';

import { InCard, PeopleGrid } from '@/components/Lists';

export default function Board() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
      <div className="relative">
        <div className="-mt-16 bg-gray-200 rounded-t-md">
          <img
            className="h-48 w-full object-cover object-center md:rounded-t-md xl:h-64"
            src="https://source.unsplash.com/random/?nature"
            alt="banner nature"
          />
        </div>

        <div className="mt-0 overflow-hidden bg-white shadow rounded-none w-full z-[1] xl:ml-12 xl:-mt-20 xl:w-72 xl:absolute xl:rounded-md">
          <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
            <img
              className="-mt-20 h-28 w-28 object-cover object-center rounded-full absolute z-[2] xl:static xl:mt-0"
              src="https://source.unsplash.com/random/?avatar"
              alt="avatar"
            />

            <span className="mt-12 font-bold xl:mt-4">fiatjaf</span>
            <span className="mt-2 text-sm font-light">description</span>
          </div>
        </div>

        <div className="w-full bg-gray-100 p-6 xl:py-14 xl:pl-[24rem] xl:pr-12">
          {boardName?.includes('Geek') ? (
            <PeopleGrid boardName={boardName || ''} />
          ) : boardName?.includes('Encyclopedia') ? (
            <InCard boardName={boardName || ''} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
