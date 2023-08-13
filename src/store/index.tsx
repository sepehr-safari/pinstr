import { SimplePool } from 'nostr-tools';
import { create } from 'zustand';

interface LocalState {
  pool: SimplePool;
  relays: string[];
  kinds: number[];
}

interface Actions {
  setRelays: (relays: string[]) => void;
  setKinds: (kinds: number[]) => void;
}

const useLocalState = create<LocalState & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://relay.nostr.band', 'wss://nos.lol'],
  kinds: [33888],
  setRelays: (relays) => set({ relays }),
  setKinds: (kinds) => set({ kinds }),
}));

export default useLocalState;
