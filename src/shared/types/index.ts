import { NDKEvent } from '@nostr-dev-kit/ndk';

export enum Format {
  'Text' = 'Text',
  'Link' = 'Link',
  'Image' = 'Image',
  'Video' = 'Video',
  'Profile' = 'Profile',
  'Note' = 'Note',
}

export enum Category {
  'Entertainment' = 'Entertainment',
  'Technology' = 'Technology',
  'FOSS' = 'FOSS',
  'Worldview' = 'Worldview',
  'Fashion' = 'Fashion',
  'Food' = 'Food',
  'Arts' = 'Arts',
  'Sports' = 'Sports',
  'Architecture' = 'Architecture',
  'Adventure' = 'Adventure',
  'Science' = 'Science',
  'History' = 'History',
  'Business' = 'Business',
  'Jobs' = 'Jobs',
  'Family' = 'Family',
  'Mindfulness' = 'Mindfulness',
}

export type Pin = string[];

export type Board = {
  title: string;
  description: string;
  category: Category;
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
