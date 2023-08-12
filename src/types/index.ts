export type Pin = string[];

export interface Board {
  id: string;
  name: string;
  author: {
    pubkey: string;
    details?: Author | undefined;
  };
  template: string;
  cover: string;
  headers: string[];
  pins: Pin[];
}

export interface Author {
  hexPubkey: string;
  picture: string;
  name: string;
  displayName: string;
  nip05: string;
  about: string;
  banner: string;
  lud06: string;
  website: string;
  npub: string;
}
