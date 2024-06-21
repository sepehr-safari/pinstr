import { Switch } from '@headlessui/react';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { toast } from 'react-toastify';

import { Button, Modal, Spinner, Text } from '@/shared/components';
import { useEvents, useUser } from '@/shared/hooks/queries';
import { Board } from '@/shared/types';
import { joinClassNames } from '@/shared/utils';

import { BOOST_DURATIONS } from './config';

type Props = {
  board: Board;
};

export const BoardBooster = ({ board }: Props) => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(BOOST_DURATIONS[0]);
  const [anon, setAnon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [boostRequest, setBoostRequest] = useState<string | null>(null);

  const { pubkey } = useUser();

  const filters = boostRequest ? [{ ids: [boostRequest] }] : [];
  const { events } = useEvents({
    filters,
    enabled: filters.length > 0,
  });

  useEffect(() => {
    if (events.length > 0) {
      const { webln } = window as { webln?: any };

      if (!webln) {
        setIsProcessing(false);
        toast.error('Webln is not available!');
      }

      webln
        .enable()
        .then(() => {
          events[0].zap(selectedDuration.zapAmount * 1000, '').then((invoice) => {
            invoice &&
              webln
                .sendPayment(invoice)
                .then(() => {
                  setIsProcessing(false);
                  setBoostRequest(null);
                  setIsShowingModal(false);
                  setIsExploding(true);
                })
                .catch(() => {
                  setIsProcessing(false);
                  toast.error('Zap failed!');
                });
          });
        })
        .catch(() => {
          setIsProcessing(false);
          toast.error('Could not enable webln!');
        });
    }
  }, [events]);

  const fetchBoostRequest = async () => {
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

    if (data && data.eventId) {
      setBoostRequest(data.eventId);
    }
  };

  return (
    <>
      {isExploding && (
        <ConfettiExplosion
          zIndex={50}
          force={0.8}
          duration={3000}
          particleCount={250}
          width={1600}
        />
      )}

      <Button
        variant="primary"
        rounded
        icon={<RocketLaunchIcon />}
        label="BOOSTR ™️"
        onClick={() => {
          setIsExploding(false);
          setAnon(false);
          setSelectedDuration(BOOST_DURATIONS[0]);
          setBoostRequest(null);
          setIsProcessing(false);

          setIsShowingModal(true);
        }}
        tooltip="⚡️ Zap to boost"
      />

      {isShowingModal && (
        <Modal onClose={() => setIsShowingModal(false)}>
          <div className="flex flex-col gap-4">
            <div className="text-center flex flex-col gap-2">
              <Text variant="h3">{`🚀 Support Your Favorite Boards with ⚡️ Zap!`}</Text>
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
                    disabled={isProcessing}
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
              label={
                isProcessing
                  ? `Processing...`
                  : `⚡️ Zap ${selectedDuration.zapAmount || '_'} Sats to boost for ${
                      selectedDuration.label
                    }`
              }
              onClick={() => {
                setIsProcessing(true);

                fetchBoostRequest();
              }}
              disabled={isProcessing}
              icon={isProcessing && <Spinner />}
            />

            <div className="text-center">
              <Text variant="xs">
                {`Boosts will be processed automatically once the payment is confirmed.`}
              </Text>
              <Text variant="xs">
                {`These zaps are sent to the Pinstr developers as donations.`}
              </Text>
              <Text variant="xs">
                {`You can also consider supporting your favorite boards by zapping them directly.`}
              </Text>
              <Text variant="xs">
                {`You can not boost an already boosted board, until the boost expires.`}
              </Text>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
