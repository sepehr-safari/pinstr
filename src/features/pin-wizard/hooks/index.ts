import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { useMutateBoard } from '@/shared/hooks/mutations';
import { Board, Format } from '@/shared/types';
import { OGloader } from '@/shared/utils';

import { PRESERVED_TITLES } from '../config';

type Props = {
  initialBoard: Board;
  pinIndex: number;
};

/**
 * A custom hook for managing the state of the Pin Wizard form.
 * @param initialBoard - The initial state of the board.
 * @param pinIndex - The index of the pin being edited.
 * @returns An object containing the state and methods for managing the Pin Wizard form.
 */
export const usePinWizard = ({ initialBoard, pinIndex }: Props) => {
  /**
   * The partial state of the board being edited.
   */
  const [partialBoard, setPartialBoard] = useState<Partial<Board>>(initialBoard);

  /**
   * Whether the link preview is being fetched.
   */
  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false);

  /**
   * Whether the reorder arrows are being shown.
   */
  const [isShowingReorderArrows, setIsShowingReorderArrows] = useState(false);

  /**
   * The headers and pins of the partial board.
   */
  const { headers, pins } = partialBoard;

  /**
   * The mutation functions for updating the board.
   */
  const { publishBoard, isLoading, removePin } = useMutateBoard();

  /**
   * Sets a partial board item.
   * @param key - The key of the item to set.
   * @param value - The value to set.
   */
  const setPartialBoardItem = (key: keyof Board, value: any) => {
    setPartialBoard((board) => ({ ...board, [key]: value }));
  };

  /**
   * Sets a pin in the partial board.
   * @param pinIndex - The index of the pin to set.
   * @param headerIndex - The index of the header to set.
   * @param value - The value to set.
   */
  const setPinInPartialBoard = (pinIndex: number, headerIndex: number, value: any) => {
    const newPins = [...(partialBoard.pins || [])];
    if (newPins.length > pinIndex) {
      newPins[pinIndex][headerIndex] = value;
    } else {
      newPins[pinIndex] = [];
      newPins[pinIndex][headerIndex] = value;
    }

    setPartialBoardItem('pins', newPins);
  };

  /**
   * Determines whether the form can be submitted.
   */
  const canSubmit = useMemo(() => {
    if (partialBoard.headers == undefined || partialBoard.pins == undefined) {
      return false;
    }

    return partialBoard.headers.every((header, headerIndex) => {
      const title = header.split(':')[1];

      if (PRESERVED_TITLES.includes(title) == false) {
        return true;
      }

      return (
        partialBoard.pins != undefined &&
        partialBoard.pins.length > pinIndex &&
        partialBoard.pins[pinIndex][headerIndex] != undefined &&
        partialBoard.pins[pinIndex][headerIndex] != ''
      );
    });
  }, [partialBoard.headers, partialBoard.pins, pinIndex]);

  /**
   * The index of the first optional header.
   */
  const firstOptionalHeaderIndex = useMemo(() => {
    if (!headers) return -1;

    return headers.findIndex((header) => PRESERVED_TITLES.includes(header.split(':')[1]) == false);
  }, [headers]);

  /**
   * Fetches the link preview for the current pin, if it is a link.
   */
  const fetchLinkPreview = () => {
    if (pinIndex == null || !headers || !pins || headers.length == 0 || pins.length <= pinIndex) {
      return;
    }

    const [format] = headers[0].split(':') as [Format, string];
    if (format != Format.Link) return;

    if (pins[pinIndex].length == 0) {
      return;
    }

    const url = pins[pinIndex][0];
    if (!url || !url.startsWith('http')) return;

    setIsFetchingLinkPreview(true);

    toast.promise(
      fetch(OGloader(url))
        .then((res) => res.json())
        .then((data) => {
          if (data.ogImage && data.ogImage.length > 0) {
            setPinInPartialBoard(pinIndex, 2, data.ogImage[0].url);
          }
          if (data.ogTitle) {
            setPinInPartialBoard(pinIndex, 1, data.ogTitle);
          }
        })
        .finally(() => setIsFetchingLinkPreview(false)),
      {
        pending: 'Loading link preview...',
        error: 'Your link has no preview! Please fill the fields manually.',
        success: 'Successfully loaded!',
      }
    );
  };

  return {
    partialBoard,
    isFetchingLinkPreview,
    isShowingReorderArrows,
    setIsShowingReorderArrows,
    setPartialBoardItem,
    setPinInPartialBoard,
    canSubmit,
    firstOptionalHeaderIndex,
    fetchLinkPreview,
    publishBoard,
    isLoading,
    removePin,
    pins,
    headers,
  };
};
