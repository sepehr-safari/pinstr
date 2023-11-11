import { Board } from '@/shared/types';

export type FeaturesToolProps = {
  initialBoard: Board;
  setPartialBoardItem: (key: keyof Board, value: any) => void;
};
