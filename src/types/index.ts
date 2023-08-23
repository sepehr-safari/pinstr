import { Event } from 'nostr-tools';

export type Pin = string[];

export type ParsedPin = { [key: string]: string };

export interface Board {
  id: string;
  timestamp: number;
  title: string;
  author: string;
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

export interface Reactions {
  likes: Event<7>[];
  zaps: Event<9735>[];
  comments: Event<1>[];
}
