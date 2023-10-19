import { NDKBoard } from '@/logic/types';

/**
 * Checks if a board is valid for a mute list by ensuring that none of the mute words
 * are present in the board's title, description, or tags.
 * @param board The board to check.
 * @param muteList The list of mute words to check against.
 * @returns True if the board is valid for the mute list, false otherwise.
 */
export const isMutedBoard = (board: Omit<NDKBoard, 'author'>, muteList: string[] | undefined) => {
  if (muteList == undefined || muteList.length == 0) return false;

  for (const muteWord of muteList) {
    if (
      board.title.toLowerCase().includes(muteWord.toLowerCase()) ||
      board.description.toLowerCase().includes(muteWord.toLowerCase()) ||
      board.tags.some((tag) => tag.toLowerCase().includes(muteWord.toLowerCase()))
    ) {
      return true;
    }
  }

  return false;
};
