import cloneDeep from 'lodash.clonedeep';
import { SimplePool } from 'nostr-tools';
import { create } from 'zustand';

import { Board } from '@/types';

interface State {
  pool: SimplePool;
  relays: string[];
  board: Partial<Board>;
}

interface Actions {
  setRelays: (relays: string[]) => void;
  setBoardItem: (key: keyof Board, value: any) => void;
  setBoard: (board: Partial<Board>) => void;
  setPin: (pinIndex: number, headerIndex: number, value: any) => void;
}

export const useLocalStore = create<State & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://nos.lol'],
  setRelays: (relays) => set({ relays }),
  board: {},
  setBoardItem: (key, value) => set((state) => ({ board: { ...state.board, [key]: value } })),
  setBoard: (board) => set({ board: cloneDeep(board) }),
  setPin: (pinIndex, headerIndex, value) =>
    set((state) => {
      const newPins = [...(state.board.pins || [])];
      if (newPins.length > pinIndex) {
        newPins[pinIndex][headerIndex] = value;
      } else {
        newPins[pinIndex] = [];
        newPins[pinIndex][headerIndex] = value;
      }

      return {
        board: {
          ...state.board,
          pins: newPins,
        },
      };
    }),
}));
