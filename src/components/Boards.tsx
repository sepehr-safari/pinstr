import { joinClassNames } from '@/utils';

import { BoardItem } from '@/components';
import { Board } from '@/types';

export const boards: Board[] = [
  {
    id: '1',
    title: 'Favorite Movies',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?cinema',
    description: 'This is a board of my favorite movies',
    category: 'Entertainment',
    type: 'video',
    headers: ['Content', 'Title'],
    pins: [],
    tags: ['Movies', 'Cinema', 'Film'],
  },
  {
    id: '2',
    title: 'Best Pizza Flavors',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?pizza',
    description: 'This is a board of my favorite pizza flavors',
    category: 'Food & Cooking',
    type: 'image',
    headers: ['Content', 'Title'],
    pins: [],
    tags: ['Pizza', 'Food', 'Flavors', 'Taste', 'Yummy', 'Delicious', 'Tasty'],
  },
  {
    id: '3',
    title: 'Encyclopedia of Rare and Special Edition Cars',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?rare+cars',
    description: 'This is a board of my favorite rare and special edition cars',
    category: 'Sports & Fitness',
    type: 'note',
    headers: ['Content'],
    pins: [],
    tags: ['Cars', 'Rare', 'Special', 'Edition', 'Automobiles'],
  },
  {
    id: '4',
    title: 'Top Rock Bands',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?rock+band',
    description: 'This is a board of my favorite rock bands',
    category: 'Entertainment',
    type: 'image',
    headers: ['Content', 'Title'],
    pins: [],
    tags: ['Rock', 'Band', 'Music', 'Guitar', 'Drums', 'Bass', 'Vocals'],
  },
  {
    id: '5',
    title: 'Best Seller Books',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?book',
    description: 'This is a board of my favorite books',
    category: 'Science & Education',
    type: 'link',
    headers: ['Content', 'Title', 'Image'],
    pins: [],
    tags: ['Books', 'Reading', 'Literature', 'Novels', 'Fiction'],
  },
  {
    id: '6',
    title: 'NIP-57 Zap supported Lightning Wallets',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?bitcoin',
    description:
      'This is a board of my favorite NIP-57 Zap supported Lightning Wallets',
    category: 'FOSS',
    type: 'link',
    headers: ['Content', 'Title', 'Image'],
    pins: [],
    tags: ['Bitcoin', 'Lightning', 'Wallets', 'Zap', 'NIP-57'],
  },
  {
    id: '7',
    title: 'Top 10 Python Libraries',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?python',
    description: 'This is a board of my favorite Python libraries',
    category: 'Technology',
    type: 'link',
    headers: ['Content', 'Title', 'Image'],
    pins: [],
    tags: ['Python', 'Programming', 'Libraries', 'Code', 'Software'],
  },
  {
    id: '8',
    title: 'Grammy Winners of 2010',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?grammy',
    description: 'This is a board of my favorite Grammy winners of 2010',
    category: 'Entertainment',
    type: 'link',
    headers: ['Content', 'Title', 'Image'],
    pins: [],
    tags: ['Grammy', 'Music', 'Awards', 'Winners', '2010'],
  },
  {
    id: '9',
    title: 'Nostr Geek Developers',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?developer',
    description: 'This is a board of my favorite Nostr geek developers',
    category: 'FOSS',
    type: 'profile',
    headers: ['Content'],
    pins: [],
    tags: ['Nostr', 'Developers', 'Geek'],
  },
  {
    id: '10',
    title: 'Top Nostr Designers',
    author: {
      pubkey: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      details: {
        banner:
          'https://raw.githubusercontent.com/sepehr-safari/nostribe-web-client/main/public/nostribe.png',
        website: 'https://pinstr.app',
        nip05: 'sepehr@pinstr.app',
        picture:
          'https://cdn.nostr.build/i/p/ded3166777975cce846c2abf1b653d9479b076aa93152e33f75f3db5f75079e5.gif',
        lud16: 'sepehr@getalby.com',
        displayName: 'Sepehr',
        about: 'Creator of Nostr-Hooks & Nostribe.com & Pinstr.app',
        name: 'Sepehr',
        hexPubkey: '',
        lud06: '',
        npub: 'npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7',
      },
    },
    image: 'https://source.unsplash.com/random/?designer',
    description: 'This is a board of my favorite Nostr designers',
    category: 'FOSS',
    type: 'profile',
    headers: ['Content'],
    pins: [],
    tags: ['Nostr', 'Designers'],
  },
];

export const Boards = ({
  fullWidth = false,
  noAuthor = false,
}: {
  fullWidth?: boolean;
  noAuthor?: boolean;
}) => {
  return (
    <div className="mx-auto pb-16 overflow-hidden max-w-md sm:max-w-none">
      <div
        className={joinClassNames(
          'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3',
          fullWidth
            ? 'xl:grid-cols-4 2xl:grid-cols-5'
            : 'xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'
        )}
      >
        {boards.concat(boards).map((board, index) => (
          <BoardItem board={board} key={index} noAuthor={noAuthor} />
        ))}
      </div>
    </div>
  );
};
