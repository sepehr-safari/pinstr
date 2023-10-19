import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import cloneDeep from 'lodash.clonedeep';
import { create } from 'zustand';

import { NDKBoard } from '@/logic/types';
import { SimplePool } from 'nostr-tools';

const dexieAdapter = new NDKCacheAdapterDexie({ dbName: 'pinstr-db' });

type AppState = {
  pool: SimplePool;
  relays: string[];
  board: Partial<NDKBoard>;
};

type NDKState = {
  ndk: NDK;
};

type Actions = {
  setRelays: (relays: string[]) => void;
  setBoardItem: (key: keyof NDKBoard, value: any) => void;
  setBoard: (board: Partial<NDKBoard>) => void;
  setPin: (pinIndex: number, headerIndex: number, value: any) => void;
};

export const useLocalStore = create<AppState & NDKState & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://nos.lol'],
  board: {},
  ndk: new NDK({
    signer: new NDKNip07Signer(),
    cacheAdapter: dexieAdapter,
    explicitRelayUrls: ['wss://nos.lol'],
    autoConnectUserRelays: false,
    autoFetchUserMutelist: false,
  }),
  setRelays: (relays) => set({ relays }),
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
