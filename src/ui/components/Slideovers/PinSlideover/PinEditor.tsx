import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useLocalStore } from '@/logic/store';
import { Format } from '@/logic/types';

import { ImageMenu } from '@/ui/components/Menus';

const REQUIRED_TITLES = ['Content', 'Title', 'Image'];

export const PinEditor = () => {
  const [searchParams, _] = useSearchParams();
  const action = searchParams.get('action');
  const pinIndex = searchParams.get('i');

  const headers = useLocalStore((store) => store.board.headers);
  const pins = useLocalStore((store) => store.board.pins);
  const setPin = useLocalStore((store) => store.setPin);

  useEffect(() => {
    if (!headers || !action || action != 'create-pin' || pinIndex == null) return;

    if (!pins || pins.length == +pinIndex) {
      headers.forEach((_, hIndex) => {
        setPin(+pinIndex, hIndex, '');
      });
    }
  }, [pins, headers, setPin, pinIndex, action]);

  return (
    <>
      {headers &&
        headers.map((header, hIndex) => {
          const [format, title] = header.split(':') as [Format, string];

          return (
            <div key={hIndex}>
              <label htmlFor={title} className="flex items-center gap-2">
                <span className="text-sm font-medium leading-6 text-gray-900">{title}</span>
                {REQUIRED_TITLES.includes(title) ? (
                  <span className="text-xs ml-auto">{`(Required)`}</span>
                ) : (
                  <span className="text-xs ml-auto">{`(Optional)`}</span>
                )}
              </label>
              <div className="mt-2">
                {format != Format.Image ? (
                  <textarea
                    rows={format == Format.Text && title != 'Title' ? 4 : 1}
                    name={title}
                    id={title}
                    autoComplete="off"
                    tabIndex={hIndex + 1}
                    autoFocus
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder={
                      format == Format.Link || format == Format.Video
                        ? 'https://'
                        : format == Format.Note
                        ? 'Note Id (note1...)'
                        : format == Format.Profile
                        ? 'Pubkey (npub1... / nip05 nostr address / hex)'
                        : ''
                    }
                    value={pins && pinIndex != null ? pins[parseInt(pinIndex)]?.[hIndex] : ''}
                    onChange={(e) =>
                      pinIndex != null && setPin(parseInt(pinIndex), hIndex, e.target.value)
                    }
                  />
                ) : (
                  <ImageMenu
                    image={pins && pinIndex != null ? pins[parseInt(pinIndex)]?.[hIndex] : ''}
                    setImage={(url) => pinIndex != null && setPin(parseInt(pinIndex), hIndex, url)}
                    required={REQUIRED_TITLES.includes(title)}
                  />
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};
