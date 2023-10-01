import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const reorderFeatures = searchParams.get('reorder-features');

  const headers = useLocalStore((store) => store.board.headers);
  const pins = useLocalStore((store) => store.board.pins);
  const setPin = useLocalStore((store) => store.setPin);
  const setBoardItem = useLocalStore((store) => store.setBoardItem);

  const firstOptionalHeaderIndex = useMemo(() => {
    if (!headers) return -1;

    return headers.findIndex((header) => !REQUIRED_TITLES.includes(header.split(':')[1]));
  }, [headers]);

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
        error: 'Your link has no preview! Please fill the fields manually.',
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
            <div key={hIndex} className="flex gap-2 w-full">
              {reorderFeatures === 'show' && REQUIRED_TITLES.includes(title) == false && (
                <div>
                  <button
                    className="text-gray-500 p-1 rounded-full hover:text-gray-900 hover:bg-gray-100 hover:cursor-n-resize disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:cursor-default"
                    disabled={hIndex == firstOptionalHeaderIndex}
                    onClick={() => {
                      if (pinIndex == null || hIndex == firstOptionalHeaderIndex) return;

                      const newHeaders = [...headers];
                      [newHeaders[hIndex - 1], newHeaders[hIndex]] = [
                        newHeaders[hIndex],
                        newHeaders[hIndex - 1],
                      ];

                      setBoardItem('headers', newHeaders);

                      if (pins !== undefined) {
                        const newPins = [...pins];
                        newPins.forEach((pin) => {
                          [pin[hIndex - 1], pin[hIndex]] = [pin[hIndex], pin[hIndex - 1]];
                        });
                        setBoardItem('pins', newPins);
                      }
                    }}
                  >
                    <ChevronUpIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-500 p-1 rounded-full hover:text-gray-900 hover:bg-gray-100 hover:cursor-s-resize disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:cursor-default"
                    disabled={hIndex == headers.length - 1}
                    onClick={() => {
                      if (pinIndex == null || hIndex == headers.length - 1) return;

                      const newHeaders = [...headers];
                      [newHeaders[hIndex], newHeaders[hIndex + 1]] = [
                        newHeaders[hIndex + 1],
                        newHeaders[hIndex],
                      ];

                      setBoardItem('headers', newHeaders);

                      if (pins !== undefined) {
                        const newPins = [...pins];
                        newPins.forEach((pin) => {
                          [pin[hIndex], pin[hIndex + 1]] = [pin[hIndex + 1], pin[hIndex]];
                        });
                        setBoardItem('pins', newPins);
                      }
                    }}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="w-full">
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
                      className="block w-full rounded-md border-0 py-1.5 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 disabled:bg-gray-100 disabled:text-gray-300 sm:text-sm sm:leading-6"
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
                      setImage={(url) =>
                        pinIndex != null && setPin(parseInt(pinIndex), hIndex, url)
                      }
                      required={REQUIRED_TITLES.includes(title)}
                      disabled={isFetchingLinkPreview}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
