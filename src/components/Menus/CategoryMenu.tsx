import { useEffect } from 'react';

import { MenuItem, MenuTemplate } from '@/components/Menus';

export const categories: MenuItem[] = [
  {
    title: 'All Categories',
  },
  {
    title: 'Entertainment',
    description: 'Movies, TV Shows, Music, Books, Sci-fi, and more',
  },
  {
    title: 'Technology',
    description:
      'Computers, Softwares, Mobiles, Gadgets, Programming, and more',
  },
  {
    title: 'FOSS',
    description: 'Free and Open Source Software, Bitcoin, Nostr, and more',
  },
  {
    title: 'Global Perspectives',
    description:
      'Economics, Politics, Environment, Society, Governance, and more',
  },
  {
    title: 'Fashion & Style',
    description: 'Fashion Trends, Outfits, Accessories, and more',
  },
  {
    title: 'Food & Cooking',
    description: 'Recipes, Cooking Tips, Foodie Culture, and more',
  },
  {
    title: 'Arts & Creativity',
    description:
      'Visual Arts, Graphic Design, Photography, Crafts, DIY Projects, and more',
  },
  {
    title: 'Sports & Fitness',
    description: 'Fitness Routines, Sports, and more',
  },
  {
    title: 'Home & Decor',
    description: 'Home Decor Ideas, Interior Design, and more',
  },
  {
    title: 'Travel & Nature',
    description: 'Travel Destinations, Nature, Outdoor Adventures, and more',
  },
  {
    title: 'Science & Education',
    description: 'Science, Education, Engineering, Medicine, and more',
  },
  {
    title: 'Business & Entrepreneurship',
    description: 'Business, Entrepreneurship, Startups, and more',
  },
  {
    title: 'Jobs & Career',
    description:
      'Job Opportunities, Career Tips, Industry Insights, Professional Development, and more',
  },
  {
    title: 'Family & Mindfulness',
    description:
      'Parenting Tips, Family Life, Relationships, Mindfulness, Wellness, and more',
  },
  {
    title: 'History & Culture',
    description: 'Historical Events, Culture Trends, and more',
  },
];

export const CategoryMenu = ({
  selected,
  setSelected,
  hideFirstOption,
}: {
  selected: string | undefined;
  setSelected: (item: string) => void;
  hideFirstOption?: boolean;
}) => {
  useEffect(() => {
    setSelected(!hideFirstOption ? categories[0].title : categories[1].title);
  }, []);

  return (
    <>
      <MenuTemplate
        items={!hideFirstOption ? categories : categories.slice(1)}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};
