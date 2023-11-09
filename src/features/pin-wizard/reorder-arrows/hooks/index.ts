import { ReorderArrowsProps } from '../types';

/**
 * Custom React hook that provides methods for reordering headers and pins in a board.
 * @param headers The array of headers to be reordered.
 * @param headerIndex The index of the header to be reordered.
 * @param pins The array of pins to be reordered.
 * @param pinIndex The index of the pin to be reordered.
 * @param firstOptionalHeaderIndex The index of the first optional header. Headers before this index cannot be moved.
 * @param setPartialBoardItem The function to set a partial board item.
 * @returns An object containing methods for moving headers and pins up and down.
 */
export const useReorderArrows = ({
  headers,
  headerIndex,
  pins,
  pinIndex,
  firstOptionalHeaderIndex,
  setPartialBoardItem,
}: ReorderArrowsProps) => {
  /**
   * Moves the selected header and its corresponding pins up by one position.
   * If the selected header is already at the top, does nothing.
   */
  const bringUp = () => {
    if (pinIndex == null || headerIndex == firstOptionalHeaderIndex) return;

    const newHeaders = [...headers];
    [newHeaders[headerIndex - 1], newHeaders[headerIndex]] = [
      newHeaders[headerIndex],
      newHeaders[headerIndex - 1],
    ];

    setPartialBoardItem('headers', newHeaders);

    if (pins !== undefined) {
      const newPins = [...pins];
      newPins.forEach((pin) => {
        [pin[headerIndex - 1], pin[headerIndex]] = [pin[headerIndex], pin[headerIndex - 1]];
      });
      setPartialBoardItem('pins', newPins);
    }
  };

  /**
   * Moves the selected header and its corresponding pins down by one position.
   * If the selected header is already at the bottom, does nothing.
   */
  const bringDown = () => {
    if (pinIndex == null || headerIndex == headers.length - 1) return;

    const newHeaders = [...headers];
    [newHeaders[headerIndex], newHeaders[headerIndex + 1]] = [
      newHeaders[headerIndex + 1],
      newHeaders[headerIndex],
    ];

    setPartialBoardItem('headers', newHeaders);

    if (pins !== undefined) {
      const newPins = [...pins];
      newPins.forEach((pin) => {
        [pin[headerIndex], pin[headerIndex + 1]] = [pin[headerIndex + 1], pin[headerIndex]];
      });
      setPartialBoardItem('pins', newPins);
    }
  };

  return {
    bringUp,
    bringDown,
  };
};
