import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLocalStore } from '@/logic/store';
import { Format } from '@/logic/types';
import { OGloader } from '@/logic/utils';

import { ImageMenu } from '@/ui/components/Menus';

const REQUIRED_TITLES = ['Content', 'Title', 'Image'];

export const PinEditor = () => {
  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false);

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

  const fetchLinkPreview = useCallback(() => {
    if (pinIndex == null || !headers || !pins || headers.length == 0 || pins.length <= +pinIndex) {
      return;
    }

    const [format] = headers[0].split(':') as [Format, string];
    if (format != Format.Link) return;

    if (pins[+pinIndex].length == 0) {
      return;
    }

    const url = pins[+pinIndex][0];
    if (!url || !url.startsWith('http')) return;

    setIsFetchingLinkPreview(true);

    toast.promise(
      fetch(OGloader(url))
        .then((res) => res.json())
        .then((data) => {
          if (data.ogImage && data.ogImage.length > 0) {
            setPin(+pinIndex, 2, data.ogImage[0].url);
          }
          if (data.ogTitle) {
            setPin(+pinIndex, 1, data.ogTitle);
          }
        })
        .finally(() => setIsFetchingLinkPreview(false)),
      {
        pending: 'Loading link preview...',
        error: 'An error has been occured! Please try again.',
        success: 'Successfully loaded!',
      }
    );
  }, [pins, setPin, headers, pinIndex, setIsFetchingLinkPreview]);

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
                    autoFocus={hIndex == 0}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 disabled:bg-gray-100 disabled:text-gray-300 sm:text-sm sm:leading-6"
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
                    onBlur={() => {
                      if (hIndex == 0 && format == Format.Link) {
                        fetchLinkPreview();
                      }
                    }}
                    disabled={isFetchingLinkPreview}
                  />
                ) : (
                  <ImageMenu
                    image={pins && pinIndex != null ? pins[parseInt(pinIndex)]?.[hIndex] : ''}
                    setImage={(url) => pinIndex != null && setPin(parseInt(pinIndex), hIndex, url)}
                    required={REQUIRED_TITLES.includes(title)}
                    disabled={isFetchingLinkPreview}
                  />
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};
