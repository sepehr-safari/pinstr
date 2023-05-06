import { useParams } from 'next/navigation';

import { useBoards } from '@/hooks';

const useCurrentBoard = () => {
  const params = useParams();
  const name = params ? decodeURIComponent(params.board) : undefined;
  const currentPinName = params ? decodeURIComponent(params.pin) : undefined;

  const { boards } = useBoards();
  const headers: string[] | undefined = name
    ? boards[name]?.headers
    : undefined;
  const pins: Pins | undefined = name ? boards[name]?.pins : undefined;

  const dTag = name ? ['d', name] : undefined;
  const headersTag = headers ? ['headers', ...headers] : ['headers', 'Name'];
  const pinTags: string[][] = pins
    ? Object.entries(pins).map(([name, values]) => ['pin', name, ...values])
    : [];

  return {
    currentBoard: {
      name,
      headers,
      pins,
    },
    currentTags: {
      dTag,
      headersTag,
      pinTags,
    },
    currentPin: {
      name: currentPinName,
    },
  };
};

export default useCurrentBoard;
