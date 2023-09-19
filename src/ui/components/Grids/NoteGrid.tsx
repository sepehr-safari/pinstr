import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthor, useNote, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { ellipsis, joinClassNames, loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';
import { EllipsisPopover } from '@/ui/components/Popovers';

export const NoteGrid = ({
  board,
  setPinIndex,
}: {
  board: Board;
  setPinIndex: (index: number) => void;
}) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const [lastPinIndex, setLastPinIndex] = useState<number>(10);
  const hasNextPage = board.pins.length > lastPinIndex;

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-4'
        )}
      >
        {board.pins.slice(0, lastPinIndex).map((pin, index) => (
          <li
            key={pin[0]}
            className="group relative overflow-hidden flex flex-col h-full justify-between rounded-lg bg-white shadow duration-300 hover:shadow-md"
          >
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              externalLinks={[[`https://njump.me/${nip19.noteEncode(pin[0])}`, 'Open in njump']]}
              editType="pin"
            />

            <NoteDetails noteId={pin[0]} setPinIndex={() => setPinIndex(index)} summary />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className="mt-16 mx-auto block text-gray-700 bg-gray-200 text-xs px-10 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
          onClick={() => setLastPinIndex((index) => index + 10)}
        >
          Show More
        </button>
      )}
    </>
  );
};

export const NoteDetails = ({
  noteId,
  summary = false,
  setPinIndex,
}: {
  noteId: string;
  summary?: boolean;
  setPinIndex?: () => void;
}) => {
  const { data: note, status } = useNote(noteId);
  const { data: author } = useAuthor(note?.pubkey);

  if (status == 'loading') {
    return (
      <div className="h-32 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!note) {
    return <div className="w-full h-full">Note not found!</div>;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex w-full items-center justify-between space-x-2 p-4">
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

          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <Link to={`/p/${author?.npub}`} className="z-[4]">
                <h3 className="inline-flex items-center truncate text-sm font-medium text-gray-900 hover:underline">
                  {author ? ellipsis(author.displayName, 20) : ''}
                </h3>
              </Link>
            </div>
            <p className="mt-1 truncate text-xs text-gray-500">
              {author ? ellipsis(author.nip05, 20) : ''}
            </p>
          </div>
        </div>

        {summary ? (
          <button
            type="button"
            className="p-4 border-t text-xs text-gray-500 grow w-full text-left hover:bg-gray-50"
            onClick={setPinIndex}
          >
            <p className="whitespace-break-spaces break-words">
              {summary ? ellipsis(note.content, 100) : ellipsis(note.content, 500)}
            </p>
          </button>
        ) : (
          <div className="p-4 border-t text-xs text-gray-500 grow w-full text-left">
            <p className="whitespace-break-spaces break-words">
              {summary ? ellipsis(note.content, 100) : ellipsis(note.content, 500)}
            </p>
          </div>
        )}
      </div>

      {!summary && (
        <div className="border-t flex w-full">
          <a
            href={`https://njump.me/${nip19.noteEncode(noteId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Open in njump
          </a>
        </div>
      )}
    </>
  );
};
