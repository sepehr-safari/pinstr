import { Board } from '@/logic/types';

export const filterBoardsByMuteList = (boards: Board[], muteList: string[]) => {
  return boards.filter((board) => {
    for (const muteWord of muteList) {
      if (
        board.title.toLowerCase().includes(muteWord.toLowerCase()) ||
        board.description.toLowerCase().includes(muteWord.toLowerCase()) ||
        board.tags.some((tag) => tag.toLowerCase().includes(muteWord.toLowerCase()))
      ) {
        return false;
      }
    }
    return true;
  });
};
