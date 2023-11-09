import { Button, DangerZone, Text } from '@/shared/components';
import { Board, Format } from '@/shared/types';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { ImageSelector } from '..';
import { PRESERVED_TITLES } from './config';
import { ReorderArrows } from './reorder-arrows';
import { usePinWizard } from './hooks';

type Props = {
  initialBoard: Board;
  pinIndex: number;
  mode: 'add' | 'edit';
};

export const PinWizard = ({ initialBoard, pinIndex, mode }: Props) => {
  const {
    canSubmit,
    fetchLinkPreview,
    isFetchingLinkPreview,
    isLoading,
    isShowingReorderArrows,
    partialBoard,
    pins,
    setPinInPartialBoard,
    setIsShowingReorderArrows,
    setPartialBoardItem,
    publishBoard,
    removePin,
    firstOptionalHeaderIndex,
    headers,
  } = usePinWizard({ initialBoard, pinIndex });

  return (
    <>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Text variant="h3">
            {mode == 'add' ? `Add a pin to "${initialBoard.title}"` : `Edit your pin`}
          </Text>

          <Text variant="xs">
            {mode == 'add'
              ? `Fill in the form below to add a new pin to your board.`
              : `Edit the details below to edit your pin.`}
          </Text>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {headers &&
            headers.map((header, headerIndex) => {
              const [format, title] = header.split(':') as [Format, string];

              return (
                <div key={headerIndex} className="flex w-full">
                  <div className="w-full">
                    <label htmlFor={title} className="flex items-center gap-2">
                      {isShowingReorderArrows && PRESERVED_TITLES.includes(title) == false && (
                        <ReorderArrows
                          firstOptionalHeaderIndex={firstOptionalHeaderIndex}
                          headerIndex={headerIndex}
                          headers={headers}
                          pinIndex={pinIndex}
                          pins={pins}
                          setPartialBoardItem={setPartialBoardItem}
                        />
                      )}

                      <Text variant="h4">{title}</Text>

                      <Text variant="h5" className="ml-auto">
                        {PRESERVED_TITLES.includes(title) ? `(Required)` : `(Optional)`}
                      </Text>
                    </label>

                    <div className="mt-2">
                      {format != Format.Image ? (
                        <textarea
                          rows={format == Format.Text && title != 'Title' ? 4 : 1}
                          name={title}
                          id={title}
                          autoComplete="off"
                          tabIndex={headerIndex + 1}
                          autoFocus={headerIndex == 0}
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
                          value={pins && pinIndex != null ? pins[pinIndex]?.[headerIndex] : ''}
                          onChange={(e) =>
                            pinIndex != null &&
                            setPinInPartialBoard(pinIndex, headerIndex, e.target.value)
                          }
                          onBlur={() => {
                            if (headerIndex == 0 && format == Format.Link) {
                              fetchLinkPreview();
                            }
                          }}
                          disabled={isFetchingLinkPreview}
                        />
                      ) : (
                        <ImageSelector
                          image={pins && pinIndex != null ? pins[pinIndex]?.[headerIndex] : ''}
                          setImage={(url) =>
                            pinIndex != null && setPinInPartialBoard(pinIndex, headerIndex, url)
                          }
                          required={PRESERVED_TITLES.includes(title)}
                          disabled={isFetchingLinkPreview}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="">
            <Button
              variant="outline"
              label="Reorder Features"
              icon={<ChevronUpDownIcon />}
              onClick={() => setIsShowingReorderArrows((prev) => !prev)}
            />
          </div>

          <div>
            <Button
              block
              rounded
              variant="primary"
              size="lg"
              disabled={!canSubmit || isLoading}
              label={mode == 'add' ? 'Add Pin' : 'Update'}
              onClick={() => publishBoard(partialBoard)}
            />
          </div>

          {mode == 'edit' && (
            <DangerZone
              button={{ onConfirm: () => removePin(initialBoard, pinIndex), label: 'Delete Pin' }}
              message="Deleting a pin is permanent and cannot be undone."
            />
          )}
        </div>
      </div>
    </>
  );
};
