import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

const useCurrentBoard = () => {
  const params = useParams();
  const currentBoardName = params?.board
    ? decodeURIComponent(params.board)
    : undefined;
  const currentPinName = params?.pin
    ? decodeURIComponent(params.pin)
    : undefined;

  const { boards } = useBoards();
  const currentBoardHeaders: string[] | undefined = currentBoardName
    ? boards[currentBoardName]?.headers
    : undefined;
  const currentBoardPins: Pins | undefined = currentBoardName
    ? boards[currentBoardName]?.pins
    : undefined;

  const dTag = currentBoardName ? ['d', currentBoardName] : undefined;
  const headersTag = currentBoardHeaders
    ? ['headers', ...currentBoardHeaders]
    : ['headers', 'Name'];
  const pinTags: string[][] = currentBoardPins
    ? Object.entries(currentBoardPins).map(([name, values]) => [
        'pin',
        name,
        ...values,
      ])
    : [];

  const pinItems: { [header: string]: string } = {};
  currentBoardHeaders?.forEach((header, index) => {
    if (currentBoardPins && currentPinName) {
      if (header === 'Name') {
        pinItems['Name'] = currentPinName;
      } else {
        pinItems[header] = currentBoardPins[currentPinName][index - 1];
      }
    }
  });

  return {
    currentBoard: {
      name: currentBoardName,
      headers: currentBoardHeaders,
      pins: currentBoardPins,
    },
    currentTags: {
      d: dTag,
      headers: headersTag,
      pins: pinTags,
    },
    currentPin: {
      name: currentPinName,
      items: pinItems,
    },
  };
};

export default useCurrentBoard;
