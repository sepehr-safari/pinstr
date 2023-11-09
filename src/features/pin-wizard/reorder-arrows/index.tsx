import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import { useReorderArrows } from './hooks';
import { ReorderArrowsProps } from './types';

export const ReorderArrows = ({
  headers,
  headerIndex,
  pins,
  pinIndex,
  firstOptionalHeaderIndex,
  setPartialBoardItem,
}: ReorderArrowsProps) => {
  const { bringDown, bringUp } = useReorderArrows({
    headers,
    headerIndex,
    pins,
    pinIndex,
    firstOptionalHeaderIndex,
    setPartialBoardItem,
  });

  return (
    <>
      <button
        className="text-gray-500 p-1 rounded-full hover:text-gray-900 hover:bg-gray-100 hover:cursor-n-resize disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:cursor-not-allowed"
        disabled={headerIndex == firstOptionalHeaderIndex}
        onClick={bringUp}
      >
        <ChevronUpIcon className="w-4 h-4" />
      </button>
      <button
        className="text-gray-500 p-1 rounded-full hover:text-gray-900 hover:bg-gray-100 hover:cursor-s-resize disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:cursor-not-allowed"
        disabled={headerIndex == headers.length - 1}
        onClick={bringDown}
      >
        <ChevronDownIcon className="w-4 h-4" />
      </button>
    </>
  );
};
