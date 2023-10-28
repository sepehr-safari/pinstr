import { NDKEvent } from '@nostr-dev-kit/ndk';

export enum Format {
  'Text' = 'Text',
  'Link' = 'Link',
  'Image' = 'Image',
  'Video' = 'Video',
  'Profile' = 'Profile',
  'Note' = 'Note',
}

export type Pin = string[];

export type Board = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  headers: string[];
  pins: Pin[];
  format: Format;
  event: NDKEvent;
};

export type Features = Map<Format, [string, string]>;

export type Settings = {
  muteList: string[];
};

export type ProfileAddressType = 'nip05' | 'nip19' | 'hex' | 'unknown';

export interface PopoverButton {
  title: string;
  onClick: () => void;
  description?: string;
  color?: string;
  icon?: any;
  private?: boolean;
}
