import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useState } from 'react';

import { useMutateBoardZap, useMutateNoteZap } from '@/shared/hooks/mutations';
import { useAuthor } from '@/shared/hooks/queries';

import type { Board } from '@/shared/types';

import { Modal } from '@/shared/components';
import { ZAP_AMOUNTS } from './config';

export const ZapModal = ({
  board,
  note,
  onClose,
}: {
  board?: Board | undefined;
  note?: NDKEvent | undefined;
  onClose: () => void;
}) => {
  const [selectedAmount, setSelectedAmount] = useState(ZAP_AMOUNTS[0]);
  const [comment, setComment] = useState('');

  const ndkUser = note ? new NDKUser({ hexpubkey: note.pubkey }) : undefined;
  const noteNpub = ndkUser?.npub;
  const { author } = useAuthor(board?.event.author.npub || noteNpub);

  const zapBoard = useMutateBoardZap({ board, amount: selectedAmount.amount, comment });
  const zapNote = useMutateNoteZap({ note, amount: selectedAmount.amount, comment });

  return (
    <Modal onClose={onClose}>
      <h3 className="text-xl font-bold">Send zap to {author?.profile?.name || '#'}</h3>

      <hr className="my-2" />

      <div className="flex flex-col">
        <p className="mt-2 mb-2 text-xs font-medium">Zap amount in Sats:</p>

        <div className="grid grid-cols-4 gap-4">
          {ZAP_AMOUNTS.map((zapAmount) => (
            <button
              key={zapAmount.id}
              type="button"
              className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                selectedAmount.id === zapAmount.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedAmount(zapAmount)}
            >
              {zapAmount.label}
            </button>
          ))}

          <button
            type="button"
            className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
              ZAP_AMOUNTS.includes(selectedAmount)
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-gray-900 text-white'
            }`}
            onClick={() => setSelectedAmount({ amount: 21, id: 0, label: '' })}
          >
            {`Custom`}
          </button>

          {!ZAP_AMOUNTS.includes(selectedAmount) && (
            <input
              type="number"
              className="col-span-3 px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 focus:border-gray-600 focus-visible:border-gray-500 focus:ring-gray-600 focus-visible:ring-gray-500"
              placeholder="Custom amount in Sats"
              autoFocus
              min={1}
              value={selectedAmount.amount}
              onChange={(e) =>
                setSelectedAmount({ id: 0, amount: parseInt(e.target.value), label: '' })
              }
            />
          )}
        </div>

        <div className="mt-6 mb-2 flex justify-between items-center">
          <h4 className="text-xs font-medium">{`Comment:`}</h4>

          <span className="text-xs text-gray-400">{`(Optional)`}</span>
        </div>

        <input
          className="w-full rounded-md bg-gray-100 text-gray-900 hover:bg-gray-200 focus:border-gray-600 focus-visible:border-gray-500 focus:ring-gray-600 focus-visible:ring-gray-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <hr className="my-4" />

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 disabled:opacity-50"
          disabled={!author || !selectedAmount.amount}
          onClick={() => {
            if (board) {
              zapBoard.mutate();
            } else if (note) {
              zapNote.mutate();
            }

            onClose();
          }}
        >
          {`⚡️ Zap ${selectedAmount.amount || '_'} sats`}
        </button>
      </div>
    </Modal>
  );
};
