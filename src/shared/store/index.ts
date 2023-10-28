import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { SimplePool } from 'nostr-tools';
import { Category, Format } from 'shared/types';
import { create } from 'zustand';

type NDKState = {
  ndk: NDK;
};

type AppState = {
  pool: SimplePool;
  relays: string[];
  filters: {
    format: Format | null;
    category: Category | null;
    tag: string | null;
  };
};

type Actions = {
  setRelays: (relays: string[]) => void;
  setFormatFilter: (format: Format | null) => void;
  setCategoryFilter: (category: Category | null) => void;
  setTagFilter: (tag: string | null) => void;
};

export const useLocalStore = create<NDKState & AppState & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://nos.lol'],
  ndk: new NDK({
    signer: new NDKNip07Signer(),
    cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'pinstr-db' }),
    explicitRelayUrls: ['wss://nos.lol'],
    autoConnectUserRelays: false,
    autoFetchUserMutelist: false,
  }),
  setRelays: (relays) => set({ relays }),
  filters: {
    format: null,
    category: null,
    tag: null,
  },
  setFormatFilter: (format) => set((state) => ({ filters: { ...state.filters, format } })),
  setCategoryFilter: (category) => set((state) => ({ filters: { ...state.filters, category } })),
  setTagFilter: (tag) => set((state) => ({ filters: { ...state.filters, tag } })),
}));
