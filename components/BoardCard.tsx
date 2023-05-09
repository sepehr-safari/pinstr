'use client';

import {
  BoltIcon,
  ChatBubbleLeftIcon,
  ChevronRightIcon,
  FolderIcon,
  PaperClipIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

import { useBoards, useMetadata } from '@/hooks';

import { formatRelativeTime } from '@/utils';

type BoardCardProps = {
  pubkey: string;
  boardName: string;
};

const BoardCard = ({ pubkey, boardName }: BoardCardProps) => {
  const { boards, events } = useBoards({
    pubkeys: [pubkey],
    boardName,
    enabled: !!pubkey && !!boardName,
  });

  const { name, picture, npub } = useMetadata({ pubkey });

  return (
    <>
      <div className="flex flex-col gap-2 border-neutral-700 border-[1px] rounded-xl bg-base-200 max-w-screen-lg w-full">
        <div className="p-4 gap-4 flex items-center border-b border-neutral">
          <Link
            href={`/p/${npub}`}
            className="flex gap-2 items-center hover:translate-x-1 hover:text-primary ease-in-out transition-all duration-200"
          >
            <div className="avatar">
              <div className="w-10 rounded-xl">
                <img src={picture || '/pinstr.png'} />
              </div>
            </div>
            <h2 className="text-lg">{name}</h2>
          </Link>
          <div className="ml-auto">
            <p className="text-xs text-neutral-500">
              {events.length > 0 && formatRelativeTime(events[0].created_at)}
            </p>
          </div>
        </div>
        <div className="flex flex-col grow gap-4 p-4">
          <div className="flex gap-2 items-center">
            <Link
              href={`/p/${npub}/${boardName}`}
              className="flex gap-2 items-center  hover:text-primary hover:translate-x-1 ease-in-out transition-all duration-200"
            >
              <h3 className="text-lg font-bold flex items-start gap-2">
                <div className="h-6 w-6">
                  <FolderIcon />
                </div>
                {boardName}
              </h3>
            </Link>

            <Link
              href={`/explore/${boardName}`}
              className="ml-auto btn btn-xs bg-neutral"
            >
              Explore
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {boards.length > 0 &&
              boards[0].pins.length > 0 &&
              boards[0].pins.map((pin) => (
                <div
                  key={pin[0]}
                  tabIndex={0}
                  className="collapse collapse-arrow bg-neutral rounded-lg"
                >
                  <div className="collapse-title p-2 min-h-0 flex gap-2 items-center">
                    <div className="h-5 w-5">
                      <PaperClipIcon />
                    </div>
                    {pin[0]}
                  </div>
                  <div className="collapse-content">
                    <ul>
                      {pin.slice(1).map((item, index) => (
                        <li key={boards[0].headers[index + 1]}>
                          <p className="inline-flex gap-2">
                            <strong>{boards[0].headers[index + 1]}:</strong>
                            {item.startsWith('https://' || 'http://') ? (
                              <a className="text-primary" href={item}>
                                {item}
                              </a>
                            ) : (
                              item
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 gap-20 flex items-center border-t border-neutral">
          <div className="h-5 w-5">
            <StarIcon />
          </div>
          <div className="h-5 w-5">
            <ChatBubbleLeftIcon />
          </div>
          <div className="h-5 w-5">
            <BoltIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardCard;
