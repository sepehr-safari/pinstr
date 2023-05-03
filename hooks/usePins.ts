import useBoards from './useBoards';

const usePins = (boardId: string | undefined) => {
  if (!boardId) {
    return { pins: [], eose: false };
  }

  const { eose, events } = useBoards();

  const pins =
    events
      .find((e) => e.id === boardId)
      ?.tags.filter((t) => t[0] === 'pin')
      .map((t) => {
        const [_, ...rest] = t;
        return rest;
      }) || [];

  return { pins, eose };
};

export default usePins;
