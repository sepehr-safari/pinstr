import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCommentsParams } from '@/logic/hooks';
import { useAuthor, useNote, useUser } from '@/logic/queries';
import { Board } from '@/logic/types';
import { joinClassNames, loader } from '@/logic/utils';

import { Spinner } from '@/ui/components';
import { EllipsisPopover } from '@/ui/components/Popovers';
import { DetailsSlideover } from '@/ui/components/Slideovers';

export const NoteGrid = ({ board }: { board: Board }) => {
  const [pinIndex, setPinIndex] = useState<number>(-1);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.author : false;

  const { commentsParam } = useCommentsParams();

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1 sm:grid-cols-2',
          commentsParam == null
            ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 5xl:grid-cols-5'
            : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-2 4xl:grid-cols-3 5xl:grid-cols-4'
        )}
      >
        {(board.pins || []).map((pin, index) => (
          <li
            key={pin[0] + index}
            className="group relative overflow-hidden flex flex-col h-full justify-between rounded-lg bg-white shadow duration-300 hover:shadow-md"
          >
            <EllipsisPopover
              board={board}
              selfBoard={selfBoard}
              pinIndex={index}
              externalLinks={[
                [`https://primal.net/e/${nip19.noteEncode(pin[0])}`, 'Open With Primal'],
              ]}
              editType="pin"
            />

            <NoteDetails noteId={pin[0]} setPinIndex={() => setPinIndex(index)} summary />
          </li>
        ))}
      </ul>

      <DetailsSlideover board={board} pinIndex={pinIndex} setPinIndex={setPinIndex}>
        {pinIndex > -1 && <NoteDetails key={pinIndex} noteId={board.pins[pinIndex][0]} />}
      </DetailsSlideover>
    </>
  );
};

const NoteDetails = ({
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
              <Link to={`/p/${author?.npub}`} className="z-[4] hover:cursor-zoom-in">
                <h3 className="inline-flex items-center truncate text-sm font-medium text-gray-900 hover:underline">
                  {author?.displayName}
                </h3>
              </Link>
            </div>
            <p className="mt-1 truncate text-xs text-gray-500">{author?.nip05}</p>
          </div>
        </div>

        {summary ? (
          <button
            type="button"
            className="p-4 border-t text-xs text-gray-500 grow w-full text-left hover:bg-gray-50"
            onClick={setPinIndex}
          >
            <p className="whitespace-break-spaces break-words">
              {summary && note.content.length > 100
                ? note.content.slice(0, 100) + '...'
                : note.content}
            </p>
          </button>
        ) : (
          <div className="p-4 border-t text-xs text-gray-500 grow w-full text-left">
            <p className="whitespace-break-spaces break-words">
              {summary && note.content.length > 100
                ? note.content.slice(0, 100) + '...'
                : note.content}
            </p>
          </div>
        )}
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
