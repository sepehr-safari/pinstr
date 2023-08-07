import { useParams } from 'react-router-dom';

export default function Board() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
      <div className="relative">
        <div className="-mt-16">
          <img
            className="h-48 w-full object-cover object-center md:rounded-t-md lg:h-64"
            src="https://source.unsplash.com/random/?nature"
            alt="banner nature"
          />
        </div>

        <div className="mt-0 overflow-hidden bg-white shadow rounded-none w-full z-[1] lg:ml-10 lg:-mt-20 lg:w-96 lg:absolute lg:rounded-md">
          <div className="px-4 py-5 sm:p-6 flex flex-col items-center">
            <img
              className="-mt-20 h-32 w-32 object-cover object-center rounded-full absolute z-[2] lg:static lg:mt-0"
              src="https://source.unsplash.com/random/?avatar"
              alt="avatar"
            />

            <span className="mt-4 font-bold">fiatjaf</span>
            <span className="mt-2 text-sm font-light">description</span>
          </div>
        </div>

        <div className="w-full bg-gray-100 h-screen p-4 lg:p-6 lg:pl-[29rem]">
          {boardName}
        </div>
      </div>
    </>
  );
}
