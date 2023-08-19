export type Pin = string[];

export interface Board {
  id: string;
  timestamp: number;
  title: string;
  author: {
    pubkey: string;
    details?: Author | undefined;
  };
  description: string;
  category: string;
  tags: string[];
  type: string;
  image: string;
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
  lud16: string;
  website: string;
  npub: string;
}
