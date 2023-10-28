import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { SimplePool } from 'nostr-tools';
import { create } from 'zustand';

import { Actions, AppState, NDKState } from './types';

const dexieAdapter = new NDKCacheAdapterDexie({ dbName: 'pinstr-db' });

export const useLocalStore = create<AppState & NDKState & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://nos.lol'],
  ndk: new NDK({
    signer: new NDKNip07Signer(),
    cacheAdapter: dexieAdapter,
    explicitRelayUrls: ['wss://nos.lol'],
    autoConnectUserRelays: false,
    autoFetchUserMutelist: false,
  }),
  setRelays: (relays) => set({ relays }),
}));
