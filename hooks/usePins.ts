import useBoards from './useBoards';

const generateId = () => {
  return Math.random().toString(36).substring(2);
};

interface Pin {
  id: string;
  [key: string]: string;
}

const usePins = (boardId: string | undefined) => {
  const { eose, events } = useBoards();

  const boardEvent = events.find((e) => e.id === boardId);

  // const dTag = boardEvent?.tags.find((t) => t[0] === 'd');
  const headersTag = boardEvent?.tags.find((t) => t[0] === 'headers');
  const pinTags = boardEvent?.tags.filter((t) => t[0] === 'pin');

  const pins =
    (pinTags || []).map((pinTag, index) => {
      const pin: Pin = {
        id: `${index}`,
      };

      pinTag.forEach((value, index) => {
        const key = headersTag?.[index];
        if (key && key !== 'headers') {
          pin[key] = value;
        }
      });

      return pin;
    }) || [];

  return { pins, eose };
};

export default usePins;
