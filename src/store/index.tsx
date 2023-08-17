import { SimplePool } from 'nostr-tools';
import { create } from 'zustand';

interface LocalState {
  pool: SimplePool;
  relays: string[];
}

interface Actions {
  setRelays: (relays: string[]) => void;
}

const useLocalState = create<LocalState & Actions>((set) => ({
  pool: new SimplePool(),
  relays: ['wss://relay.nostr.band', 'wss://nos.lol'],
  setRelays: (relays) => set({ relays }),
}));

export default useLocalState;
