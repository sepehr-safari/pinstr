import { Event } from 'nostr-tools';

export type Settings = {
  muteList: string[];
};

export type Pin = string[];

export enum Format {
  'Text' = 'Text',
  'Link' = 'Link',
  'Image' = 'Image',
  'Video' = 'Video',
  'Profile' = 'Profile',
  'Note' = 'Note',
}

export type Features = Map<Format, [string, string]>;

export interface Board {
  id: string;
  timestamp: number;
  title: string;
  author: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  headers: string[];
  pins: Pin[];
  format: Format;
  event: Event<33889>;
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
  event: Event<0>;
}

export interface Reactions {
  likes: Event<7>[];
  zaps: Event<9735>[];
  comments: Event<1>[];
}

export type ProfileAddressType = 'nip05' | 'nip19' | 'hex' | 'unknown';

export interface PopoverButton {
  title: string;
  onClick: () => void;
  description?: string;
  color?: string;
  icon?: any;
  private?: boolean;
}
