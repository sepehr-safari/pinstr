import {
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  LinkIcon,
  PhotoIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

import { joinClassNames } from '@/utils';

export interface SelectableBoardTypeItem {
  id: number;
  title: string;
  description: string;
  icon: any;
  background: string;
  type: string;
  headers: string[];
}

type Props = {
  setSelectedBoardType: (boardTypeMenuItem: SelectableBoardTypeItem) => void;
};

export const selectableBoardTypeItems: SelectableBoardTypeItem[] = [
  {
    id: 1,
    title: 'Create a new board of plain texts',
    description: 'e.g. a board of your favorite quotes',
    icon: DocumentTextIcon,
    background: 'bg-pink-600',
    type: 'text',
    headers: ['Content', 'Title', 'Image'],
  },
  {
    id: 2,
    title: 'Create a new board of links',
    description: 'e.g. a board of your favorite blog posts',
    icon: LinkIcon,
    background: 'bg-indigo-600',
    type: 'link',
    headers: ['Content', 'Title', 'Image'],
  },
  {
    id: 3,
    title: 'Create a new board of images',
    description: 'e.g. a board of your favorite memes or gifs',
    icon: PhotoIcon,
    background: 'bg-green-600',
    type: 'image',
    headers: ['Content', 'Title'],
  },
  {
    id: 4,
    title: 'Create a new board of videos',
    description: 'e.g. a board of your favorite YouTube videos',
    icon: VideoCameraIcon,
    background: 'bg-blue-600',
    type: 'video',
    headers: ['Content', 'Title'],
  },
  {
    id: 5,
    title: 'Create a new board of NOSTR profiles',
    description: 'e.g. a board of nostr developers you admire',
    icon: UserIcon,
    background: 'bg-yellow-600',
    type: 'profile',
    headers: ['Content'],
  },
  {
    id: 6,
    title: 'Create a new board of NOSTR notes',
    description: 'e.g. a board of your favorite notes about bitcoin',
    icon: ChatBubbleLeftIcon,
    background: 'bg-purple-600',
    type: 'note',
    headers: ['Content'],
  },
];

export function SelectableBoardTypes({ setSelectedBoardType }: Props) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6">
      {selectableBoardTypeItems.map((selectableBoardTypeItem) => (
        <li key={selectableBoardTypeItem.id} className="flow-root">
          <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-gray-500 hover:bg-gray-100 hover:cursor-pointer">
            <div
              className={joinClassNames(
                selectableBoardTypeItem.background,
                'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
              )}
            >
              <selectableBoardTypeItem.icon
                className="h-8 w-8 text-white"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                <div
                  onClick={() => setSelectedBoardType(selectableBoardTypeItem)}
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <span>{selectableBoardTypeItem.title}</span>
                </div>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectableBoardTypeItem.description}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
