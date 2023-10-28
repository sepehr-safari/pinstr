import NDK from '@nostr-dev-kit/ndk';
import { SimplePool } from 'nostr-tools';

export type AppState = {
  pool: SimplePool;
  relays: string[];
};

export type NDKState = {
  ndk: NDK;
};

export type Actions = {
  setRelays: (relays: string[]) => void;
};
