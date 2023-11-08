import { type MenuItem } from '@/shared/components';

export const FORMAT_FILTER_MENU_ITEMS: MenuItem[] = [
  {
    title: 'All Formats',
  },
  {
    title: 'Text',
    description: 'Plain texts',
  },
  {
    title: 'Link',
    description: 'Links to external websites',
  },
  {
    title: 'Image',
    description: 'Images',
  },
  {
    title: 'Video',
    description: 'Links to videos, e.g. YouTube, Vimeo, etc.',
  },
  {
    title: 'Profile',
    description: 'Nostr profiles',
  },
  {
    title: 'Note',
    description: 'Nostr notes',
  },
];
