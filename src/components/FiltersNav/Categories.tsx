import { joinClassNames } from '@/utils';

import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

const tabs = [
  {
    name: 'Entertainment',
    description: 'Movies, TV Shows, Music, Books, Sci-fi, and more',
    current: true,
  },
  {
    name: 'Technology',
    description:
      'Computers, Softwares, Mobiles, Gadgets, Programming, and more',
    current: false,
  },
  {
    name: 'FOSS',
    description: 'Free and Open Source Software, Bitcoin, Nostr, and more',
    current: false,
  },
  {
    name: 'Global Perspectives',
    description:
      'Economics, Politics, Environment, Society, Governance, and more',
    current: false,
  },
  {
    name: 'Fashion & Style',
    description: 'Fashion Trends, Outfits, Accessories, and more',
    current: false,
  },
  {
    name: 'Food & Cooking',
    description: 'Recipes, Cooking Tips, Foodie Culture, and more',
    current: false,
  },
  {
    name: 'Arts & Creativity',
    description:
      'Visual Arts, Graphic Design, Photography, Crafts, DIY Projects, and more',
    current: false,
  },
  {
    name: 'Sports & Fitness',
    description: 'Fitness Routines, Sports, and more',
    current: false,
  },
  {
    name: 'Home & Decor',
    description: 'Home Decor Ideas, Interior Design, and more',
    current: false,
  },
  {
    name: 'Travel & Nature',
    description: 'Travel Destinations, Nature, Outdoor Adventures, and more',
    current: false,
  },
  {
    name: 'Science & Education',
    description: 'Science, Education, Engineering, Medicine, and more',
    current: false,
  },
  {
    name: 'Business & Entrepreneurship',
    description: 'Business, Entrepreneurship, Startups, and more',
    current: false,
  },
  {
    name: 'Jobs & Career',
    description:
      'Job Opportunities, Career Tips, Industry Insights, Professional Development, and more',
    current: false,
  },
  {
    name: 'Family & Mindfulness',
    description:
      'Parenting Tips, Family Life, Relationships, Mindfulness, Wellness, and more',
    current: false,
  },
  {
    name: 'History & Culture',
    description: 'Historical Events, Culture Trends, and more',
    current: false,
  },
];

export default function Categories() {
  const [state, setState] = useState<string>(tabs[0].name);

  return (
    <Menu
      as="div"
      className="relative inline-block text-left order-last w-full md:w-auto md:order-none"
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {state}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 max-h-80 overflow-y-auto md:w-max focus:outline-none">
          <div className="py-1">
            {tabs.map((tab) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={joinClassNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={() => setState(tab.name)}
                  >
                    {tab.name}
                    <span className="block text-xs text-gray-400">
                      {tab.description}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
