import { Switch } from '@headlessui/react';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { NDKFilter } from '@nostr-dev-kit/ndk';
import { useState } from 'react';

import { Button, Modal, Text } from '@/shared/components';
import { useUser } from '@/shared/hooks/queries';
import { useLocalStore } from '@/shared/store';
import { Board } from '@/shared/types';
import { joinClassNames } from '@/shared/utils';

import { BOOST_DURATIONS } from './config';
import { toast } from 'react-toastify';

type Props = {
  board: Board;
};

export const BoardBooster = ({ board }: Props) => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(BOOST_DURATIONS[0]);
  const [anon, setAnon] = useState(false);

  const { pubkey } = useUser();
  const ndk = useLocalStore((store) => store.ndk);

  const fetchBoostRequestAndZap = async () => {
    const searchParams = new URLSearchParams({
      boardAuthor: encodeURIComponent(board.event.author.npub),
      boardTitle: encodeURIComponent(board.title),
      boostDuration: encodeURIComponent(selectedDuration.durationAmount),
      zapAmount: encodeURIComponent(selectedDuration.zapAmount),
      booster: !anon && pubkey ? encodeURIComponent(pubkey) : '',
    });

    const res = await fetch(import.meta.env.VITE_BOOSTR_API_URL + '?' + searchParams.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: import.meta.env.VITE_BOOSTR_API_KEY,
      },
    });

    const data = await res.json();

    if (data) {
      const filter: NDKFilter = { ids: [data.eventId] };
      const event = await ndk.fetchEvent(filter);

      const invoice = await event?.zap(selectedDuration.zapAmount * 1000, '');

      const { webln } = window as { webln?: any };

      if (webln) {
        try {
          await webln.enable();

          try {
            await webln.sendPayment(invoice);

            return true;
          } catch (error) {
            throw new Error('Failed to send payment');
          }
        } catch (e) {
          throw new Error('Failed to enable WebLN');
        }
      } else {
        throw new Error('WebLN is not defined');
      }
    }
  };

  return (
    <>
      <Button
        variant="primary"
        block
        icon={<RocketLaunchIcon />}
        label="Boost This Board!"
        onClick={() => setIsShowingModal(true)}
      />

      {isShowingModal && (
        <Modal onClose={() => setIsShowingModal(false)}>
          <div className="flex flex-col gap-4">
            <div className="text-center flex flex-col gap-2">
              <Text variant="h3">{`🚀 Support Your Favorite Board 🚀`}</Text>
              <Text variant="h4">{`Boost this board to the FEATURED section!`}</Text>
            </div>

            <div className="flex flex-col gap-2">
              <Text variant="xs">{`Select the duration of the boost:`}</Text>

              <div className="grid grid-cols-3 gap-4">
                {BOOST_DURATIONS.map((boostDuration) => (
                  <button
                    key={boostDuration.id}
                    type="button"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md ${
                      selectedDuration.id === boostDuration.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedDuration(boostDuration)}
                  >
                    {boostDuration.label}
                  </button>
                ))}
              </div>
            </div>

            <Switch.Group as="div" className="flex items-center justify-center">
              <Switch
                checked={anon}
                onChange={setAnon}
                className={joinClassNames(
                  anon ? 'bg-gray-700' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                )}
              >
                <span
                  aria-hidden="true"
                  className={joinClassNames(
                    anon ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3 text-sm cursor-pointer">
                <Text variant="h4">
                  {`Anonymouse`}
                  <span className="text-xs font-light text-gray-500">{` (Your name will not be shown)`}</span>
                </Text>
              </Switch.Label>
            </Switch.Group>

            <Button
              variant="primary"
              size="lg"
              label={`⚡️ Zap ${selectedDuration.zapAmount || '_'} Sats to boost for ${
                selectedDuration.label
              }`}
              onClick={() =>
                toast
                  .promise(fetchBoostRequestAndZap, {
                    pending: 'Processing...',
                    success: 'Successfully Boosted!',
                    error: 'Failed to Boost.',
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }
            />

            <div className="text-center">
              <Text variant="xs">
                {`You can not boost an already boosted board, until the boost expires.`}
              </Text>
              <Text variant="xs">
                {`Boosts will be processed automatically once the payment is confirmed.`}
              </Text>
              <Text variant="xs">
                {`These zaps are sent to the Pinstr developers as donations.`}
              </Text>
              <Text variant="xs">
                {`You can also consider supporting your favorite boards by zapping them directly.`}
              </Text>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
