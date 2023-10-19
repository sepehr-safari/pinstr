import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { useMutateBoardZap, useMutateNoteZap } from '@/logic/mutations';
import { useAuthor } from '@/logic/queries';
import { NDKBoard } from '@/logic/types';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { nip19 } from 'nostr-tools';

const ZAP_AMOUNTS = [
  {
    id: 1,
    amount: 50,
    label: '50',
  },
  {
    id: 2,
    amount: 1000,
    label: '🤙 1K',
  },
  {
    id: 3,
    amount: 5000,
    label: '💜 5K',
  },
  {
    id: 4,
    amount: 10_000,
    label: '😍 10K',
  },
  {
    id: 5,
    amount: 20_000,
    label: '🤩 20K',
  },
  {
    id: 6,
    amount: 50_000,
    label: '🔥 50K',
  },
  {
    id: 7,
    amount: 100_000,
    label: '🚀 100K',
  },
  {
    id: 8,
    amount: 1_000_000,
    label: '🌙 1M',
  },
];

export const ZapModal = ({
  board,
  note,
  onClose,
}: {
  board?: NDKBoard | undefined;
  note?: NDKEvent | undefined;
  onClose: () => void;
}) => {
  const [selectedAmount, setSelectedAmount] = useState(ZAP_AMOUNTS[0]);
  const [comment, setComment] = useState('');

  const noteNpub = note ? nip19.npubEncode(note?.pubkey) : undefined;
  const { author } = useAuthor(board?.author.npub || noteNpub);

  const zapBoard = useMutateBoardZap({ board, amount: selectedAmount.amount, comment });
  const zapNote = useMutateNoteZap({ note, amount: selectedAmount.amount, comment });

  return (
    <Transition.Root show={true} appear={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 duration-200 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <h3 className="text-xl font-bold">
                  Send zap to {author?.profile?.displayName || '#'}
                </h3>

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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
