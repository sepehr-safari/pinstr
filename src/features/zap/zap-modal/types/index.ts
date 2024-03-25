import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';

export type ZapTarget =
  | {
      type: 'event';
      event: NDKEvent;
    }
  | {
      type: 'user';
      user: NDKUser;
    };
