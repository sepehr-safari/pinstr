import { useMemo, useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';
import { useMutateBoard } from '@/shared/hooks/mutations';
import { Board, Format } from '@/shared/types';
import { OGloader } from '@/shared/utils';

import { PRESERVED_TITLES } from '../config';

type Props = {
  initialBoard: Board;
  pinIndex: number;
};

export const usePinWizard = ({ initialBoard, pinIndex }: Props) => {
  const [partialBoard, setPartialBoard] = useState<Partial<Board>>(initialBoard);
  const [isFetchingLinkPreview, setIsFetchingLinkPreview] = useState(false);
  const [isShowingReorderArrows, setIsShowingReorderArrows] = useState(false);

  const { toast } = useToast();

  const { publishBoard, isLoading, removePin } = useMutateBoard();

  const { headers, pins } = partialBoard;

  const setPartialBoardItem = (key: keyof Board, value: any) => {
    setPartialBoard((board) => ({ ...board, [key]: value }));
  };

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

  const firstOptionalHeaderIndex = useMemo(() => {
    if (!headers) return -1;

    return headers.findIndex((header) => PRESERVED_TITLES.includes(header.split(':')[1]) == false);
  }, [headers]);

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

    toast({ description: 'Loading link preview...' });

    fetch(OGloader(url))
      .then((res) => res.json())
      .then((data) => {
        toast({ description: 'Successfully loaded!', variant: 'success' });

        if (data.ogImage && data.ogImage.length > 0) {
          setPinInPartialBoard(pinIndex, 2, data.ogImage[0].url);
        }
        if (data.ogTitle) {
          setPinInPartialBoard(pinIndex, 1, data.ogTitle);
        }
      })
      .catch(() => {
        toast({
          description: 'Your link has no preview! Please fill the fields manually.',
          variant: 'destructive',
        });
      })
      .finally(() => setIsFetchingLinkPreview(false));
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
