import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthor, useNote, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { loader } from '@/logic/utils';

import { PinContextMenu } from '@/ui/components';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const NoteGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={pin[0] + index}
            className="group relative overflow-hidden flex flex-col h-full justify-between rounded-lg bg-white shadow duration-300 hover:shadow-md"
          >
            <PinContextMenu
              onView={() => setPinIndex(index)}
              href={`https://primal.net/e/${nip19.noteEncode(pin[0])}`}
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
            />

            <NoteDetails noteId={pin[0]} summary />
          </li>
        ))}
      </ul>

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        onClose={() => setPinIndex(-1)}
        onPrevious={() => setPinIndex((pinIndex) => (pinIndex > -1 ? pinIndex - 1 : -1))}
        onNext={() =>
          setPinIndex((pinIndex) =>
            pinIndex > -1 && pinIndex < board.pins.length - 1 ? pinIndex + 1 : -1
          )
        }
      >
        {pinIndex > -1 && <NoteDetails key={pinIndex} noteId={board.pins[pinIndex][0]} />}
      </DetailsSlideover>
    </>
  );
};

const NoteDetails = ({ noteId, summary = false }: { noteId: string; summary?: boolean }) => {
  const { data: note } = useNote(noteId);
  const { data: author } = useAuthor(note?.pubkey);

  if (!note) {
    return <></>; // TODO: Loading state
  }

  return (
    <>
      <div className="w-full">
        <div className="flex w-full items-center justify-between space-x-6 p-4">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <Link to={`/p/${author?.npub}`} className="z-[4] hover:cursor-zoom-in">
                <h3 className="inline-flex items-center truncate text-sm font-medium text-gray-900 hover:underline">
                  {author?.displayName}

                  <ArrowRightIcon className="ml-1 w-4 h-4 duration-500 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>
              </Link>
            </div>
            <p className="mt-1 truncate text-xs text-gray-500">{author?.nip05}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gray-300 text-gray-300">
            {!!author && !!author.picture && (
              <img
                className="rounded-full"
                src={loader(author.picture, { w: 96, h: 96 })}
                alt={author?.displayName + ' avatar'}
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="p-4 border-t text-xs text-gray-500">
          <p className="whitespace-break-spaces break-words">
            {summary && note.content.length > 200
              ? note.content.slice(0, 200) + '...'
              : note.content}
          </p>
        </div>
      </div>

      {!summary && (
        <div className="border-t flex w-full">
          <a
            href={`https://primal.net/e/${nip19.noteEncode(noteId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Open with Primal
          </a>
        </div>
      )}
    </>
  );
};
