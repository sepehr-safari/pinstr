import { NDKUser } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthor, useEvent, useUser } from '@/shared/hooks/queries';
import { Board } from '@/shared/types';
import { ellipsis, joinClassNames, loader } from '@/shared/utils';

import { EllipsisPopover } from '@/features';

type Props = {
  board: Board;
  setPinIndex: (index: number) => void;
};

export const NotePinItem = ({ board, setPinIndex }: Props) => {
  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == board.event.author.pubkey : false;

  const [lastPinIndex, setLastPinIndex] = useState<number>(50);
  const hasNextPage = board.pins.length > lastPinIndex;

  if (board.pins.length == 0) {
    return <div>Empty Board!</div>;
  }

  return (
    <>
      <ul
        role="list"
        className={joinClassNames(
          'grid gap-4 grid-cols-1',
          'lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 5xl:grid-cols-7'
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
          className="mt-16 mb-10 mx-auto block text-gray-700 bg-gray-200 text-xs px-10 py-1 rounded-md disabled:text-gray-300 disabled:bg-gray-50"
          onClick={() => setLastPinIndex((index) => index + 50)}
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
  const { event: note } = useEvent(noteId);
  const ndkUser = note ? new NDKUser({ hexpubkey: note.pubkey }) : undefined;
  const noteNpub = ndkUser?.npub;
  const { author } = useAuthor(noteNpub);

  if (note == null) {
    return (
      <div className="w-full h-32 flex justify-center items-center text-xs bg-white rounded-lg text-gray-500">
        Note not found!
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex w-full items-center space-x-2 p-4">
          <div
            className={joinClassNames(
              'h-12 w-12 rounded-full bg-gray-100 text-gray-100',
              note == undefined ? 'animate-pulse' : ''
            )}
          >
            {!!author && author.profile && !!author.profile.image && (
              <img
                className="rounded-full"
                src={loader(author.profile.image, { w: 96, h: 96 })}
                alt={author?.profile.name + ' avatar'}
                loading="lazy"
              />
            )}
          </div>

          <div className="flex flex-col truncate">
            <Link to={`/p/${author?.npub}`} className="z-[4]">
              <h3 className="flex truncate text-sm font-medium text-gray-900 hover:underline">
                {author ? (
                  ellipsis(author?.profile?.name || '', 20)
                ) : (
                  <div className="animate-pulse w-24 h-[1rem] rounded bg-gray-100" />
                )}
              </h3>
            </Link>
            <p className="mt-1 truncate text-xs text-gray-500">
              {author ? (
                ellipsis(author.profile?.nip05 || '', 20)
              ) : (
                <div className="animate-pulse w-14 h-[1rem] rounded bg-gray-100" />
              )}
            </p>
          </div>
        </div>

        {summary ? (
          <button
            type="button"
            className="p-4 border-t text-xs text-gray-500 grow w-full text-left hover:bg-gray-50"
            onClick={setPinIndex}
          >
            <p className="[overflow-wrap:anywhere]">
              {note ? (
                ellipsis(note.content, 100)
              ) : (
                <div className="animate-pulse w-full h-[4rem] rounded bg-gray-100" />
              )}
            </p>
          </button>
        ) : (
          <div className="p-4 border-t text-xs text-gray-500 grow w-full text-left">
            <p className="[overflow-wrap:anywhere]">{note && ellipsis(note.content, 500)}</p>
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
