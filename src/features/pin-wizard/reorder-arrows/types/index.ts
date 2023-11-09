import { Board, Pin } from '@/shared/types';

export type ReorderArrowsProps = {
  headers: string[];
  headerIndex: number;
  pins: Pin[] | undefined;
  pinIndex: number;
  firstOptionalHeaderIndex: number;
  setPartialBoardItem: (key: keyof Board, value: any) => void;
};
