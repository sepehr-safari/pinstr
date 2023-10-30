import {
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

export const FORMATS = [
  {
    headers: ['Text:Content', 'Text:Title', 'Image:Image'],
    title: 'Create a new board of plain texts',
    description: 'e.g. a board of your favorite quotes',
    icon: DocumentTextIcon,
    background: 'bg-pink-600',
  },
  {
    headers: ['Link:Content', 'Text:Title', 'Image:Image'],
    title: 'Create a new board of links',
    description: 'e.g. a board of your favorite blog posts',
    icon: LinkIcon,
    background: 'bg-indigo-600',
  },
  {
    headers: ['Image:Content', 'Text:Title'],
    title: 'Create a new board of images',
    description: 'e.g. a board of your favorite memes or gifs',
    icon: PhotoIcon,
    background: 'bg-green-600',
  },
  {
    headers: ['Video:Content', 'Text:Title'],
    title: 'Create a new board of videos',
    description: 'e.g. a board of your favorite YouTube videos',
    icon: VideoCameraIcon,
    background: 'bg-blue-600',
  },
  {
    headers: ['Profile:Content'],
    title: 'Create a new board of NOSTR profiles',
    description: 'e.g. a board of nostr developers you admire',
    icon: UserIcon,
    background: 'bg-yellow-600',
  },
  {
    headers: ['Note:Content'],
    title: 'Create a new board of NOSTR notes',
    description: 'e.g. a board of your favorite notes about bitcoin',
    icon: ChatBubbleLeftIcon,
    background: 'bg-purple-600',
  },
];
