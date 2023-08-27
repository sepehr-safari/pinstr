import {
  BoltIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/solid';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BoardSlideover, PinSlideover } from '@/components';
import {
  ImageGrid,
  LinkGrid,
  NoteGrid,
  ProfileGrid,
  TextGrid,
  VideoGrid,
} from '@/components/Lists';
import { useMutateBoardLike } from '@/mutations';
import { useBoard, useBoardReactions, useUser } from '@/queries';
import { formatRelativeTime, loader } from '@/utils';

export const Pins = () => {
  const [openBoardSlideover, setOpenBoardSlideover] = useState(false);
  const [openPinSlideover, setOpenPinSlideover] = useState(false);

  const { npub, title } = useParams();
  const hex = nip19.decode(npub!).data.toString();

  const { data: board } = useBoard({ author: hex, title: title! });

  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == hex : false;

  return (
    <>
      <div className="gap-8 flex flex-col xl:flex-row">
        <div className="mx-auto p-2 bg-white/70 rounded-xl shadow xl:mx-0">
          <div className="aspect-w-5 aspect-h-4 w-64 rounded-md bg-gray-200 text-gray-200">
            <img
              src={board ? loader(board?.image, { w: 500, h: 400 }) : ''}
              alt={title}
              className="w-full h-full rounded-md"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-between items-center xl:items-start">
          <div className="w-full">
            <div className="flex gap-4 flex-col xl:flex-row w-full items-center text-center xl:text-start xl:items-start">
              <h2 className="text-lg font-bold tracking-tight text-gray-900 xl:text-xl 2xl:text-2xl">
                {title}
              </h2>

              {selfBoard && (
                <>
                  <div className="flex gap-2 shrink-0 xl:ml-auto">
                    <button
                      type="button"
                      className="rounded-md bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-50 ring-1 ring-inset ring-gray-900 hover:bg-gray-700 hover:text-gray-50"
                      onClick={() => setOpenBoardSlideover(true)}
                    >
                      Edit Board
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-gray-900 px-3 py-2 text-xs font-semibold text-gray-50 ring-1 ring-inset ring-gray-900 hover:bg-gray-700 hover:text-gray-50"
                      onClick={() => setOpenPinSlideover(true)}
                    >
                      Add Pin
                    </button>
                  </div>

                  {board && (
                    <>
                      <BoardSlideover
                        open={openBoardSlideover}
                        onClose={() => setOpenBoardSlideover(false)}
                        initialBoard={board}
                      />
                      <PinSlideover
                        open={openPinSlideover}
                        onClose={() => setOpenPinSlideover(false)}
                        initialBoard={board}
                        initialPinIndex={-1}
                      />
                    </>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 inline-flex w-full justify-center items-center gap-1 text-xs font-light text-gray-400 xl:gap-2 xl:justify-start xl:mt-2">
              <span>{board && formatRelativeTime(board.timestamp)}</span>
              <span>|</span>
              <span className="flex items-center">
                <Link to={`/c/${undefined}`} className="hover:underline">
                  {board?.category}
                </Link>
              </span>
            </div>

            {board && board.tags.length > 0 && (
              <div className="mt-2 flex justify-center gap-4 flex-wrap xl:justify-start">
                {board.tags.map((tag, index) => (
                  <Link
                    to={`/t/${tag}`}
                    key={index}
                    className="text-xs font-light text-gray-400 hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 flex duration-200 text-xs text-gray-700 text-center max-w-screen-sm xl:max-w-none xl:text-justify xl:mt-auto">
            {board?.description}
          </div>

          <div className="mt-4 flex gap-4 xl:mt-auto">
            <button
              className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800"
              onClick={() => like()}
            >
              <HandThumbUpIcon className="mr-2 h-4 w-4" />
              <span className="">{reactions ? reactions.likes.length : 0}</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <BoltIcon className="mr-2 h-4 w-4" />
              <span className="">{reactions ? reactions.zaps.length : 0}</span>
            </button>
            <button className="inline-flex justify-center items-center rounded-md bg-gray-100 ring-1 ring-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 hover:shadow-md hover:text-gray-800">
              <ChatBubbleLeftIcon className="mr-2 h-4 w-4" />
              <span className="">
                {reactions ? reactions.comments.length : 0}
              </span>
            </button>
          </div>
        </div>
      </div>

      {board?.type == 'Text' && <TextGrid board={board} />}
      {board?.type == 'Link' && <LinkGrid board={board} />}
      {board?.type == 'Image' && <ImageGrid board={board} />}
      {board?.type == 'Video' && <VideoGrid board={board} />}
      {board?.type == 'Profile' && <ProfileGrid board={board} />}
      {board?.type == 'Note' && <NoteGrid board={board} />}
    </>
  );
};
