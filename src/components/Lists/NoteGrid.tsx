import { nip19 } from 'nostr-tools';
import { useState } from 'react';

import { DetailsSlideover } from '@/components';
import { useAuthor, useNote } from '@/queries';
import { Board } from '@/types';
import { joinClassNames, loader } from '@/utils';

export const NoteGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  return (
    <>
      <ul
        role="list"
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={pin[0] + index}
            className="group flex flex-col h-full justify-between divide-y divide-gray-200 rounded-lg bg-white shadow ease-in-out duration-300 hover:shadow-md"
          >
            <NoteDetails
              onOpen={() => setPinIndex(index)}
              noteId={pin[0]}
              summary
            />
          </li>
        ))}
      </ul>

      <DetailsSlideover
        board={board}
        pinIndex={pinIndex}
        onClose={() => setPinIndex(-1)}
        onPrevious={() =>
          setPinIndex((pinIndex) => (pinIndex > -1 ? pinIndex - 1 : -1))
        }
        onNext={() =>
          setPinIndex((pinIndex) =>
            pinIndex > -1 && pinIndex < board.pins.length - 1
              ? pinIndex + 1
              : -1
          )
        }
      >
        {pinIndex > -1 && (
          <NoteDetails key={pinIndex} noteId={board.pins[pinIndex][0]} />
        )}
      </DetailsSlideover>
    </>
  );
};

const NoteDetails = ({
  noteId,
  summary = false,
  onOpen,
}: {
  noteId: string;
  summary?: boolean;
  onOpen?: () => void;
}) => {
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
              <h3 className="truncate text-sm font-medium text-gray-900">
                {author?.displayName}
              </h3>
            </div>
            <p className="mt-1 truncate text-xs text-gray-500">
              {author?.nip05}
            </p>
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
          <p
            className={joinClassNames(
              'whitespace-break-spaces break-words',
              summary
                ? 'delay-100 duration-500 translate-y-2 group-hover:translate-y-0'
                : ''
            )}
          >
            {summary && note.content.length > 200
              ? note.content.slice(0, 200) + '...'
              : note.content}
          </p>
        </div>
      </div>

      {summary ? (
        <div className="flex w-full opacity-0 ease-in-out duration-500 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <a
            href={`https://primal.net/e/${nip19.noteEncode(noteId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium border-r border-gray-200 ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Open with Primal
          </a>

          <button
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
            onClick={onOpen}
          >
            View details
          </button>
        </div>
      ) : (
        <div className="border-t flex w-full">
          <a
            href={`https://primal.net/e/${nip19.noteEncode(noteId)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center py-2 text-xs text-gray-700 font-medium ease-in-out duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Open with Primal
          </a>
        </div>
      )}
    </>
  );
};
