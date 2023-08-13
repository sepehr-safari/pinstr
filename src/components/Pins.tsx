import {
  BoltIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/20/solid';

import {
  LinkGrid,
  NoteGrid,
  PeopleGrid,
  PictureGrid,
  VideoGrid,
} from '@/components/Lists';
import { useParams } from 'react-router-dom';

export default function Pins() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
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
        <div className="flex flex-col justify-between items-center lg:items-start">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 text-center lg:text-start xl:text-2xl">
              {boardName}
            </h2>

            <div className="mt-2 inline-flex w-full justify-center gap-1 text-xs font-light text-black/30 lg:gap-2 lg:justify-start">
              <span>Nostr Profiles (Kind: 30000)</span>
              <span>|</span>
              <span>Technology</span>
              <span>|</span>
              <span>18 days ago</span>
            </div>
          </div>

          <p className="mt-4 text-sm font-light text-gray-500 text-center max-w-screen-sm lg:max-w-none lg:text-justify lg:mt-auto">
            We’re a dynamic group of individuals who are passionate about what
            we do and dedicated to delivering the best results for our clients.
          </p>

          <div className="mt-4 flex gap-4 lg:mt-auto">
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <HandThumbUpIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">21</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <BoltIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">2100</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <ChatBubbleLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span className="">4</span>
            </button>
          </div>
        </div>
      </div>

      {boardName?.includes('Geek') ? (
        <PeopleGrid />
      ) : boardName?.includes('Encyclopedia') ? (
        <NoteGrid />
      ) : boardName?.includes('Zap') ? (
        <LinkGrid />
      ) : boardName?.includes('Pizza') ? (
        <PictureGrid />
      ) : boardName?.includes('Movies') ? (
        <VideoGrid />
      ) : (
        <></>
      )}
    </>
  );
}
