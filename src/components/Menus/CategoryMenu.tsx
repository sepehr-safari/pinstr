import { useState } from 'react';

import { MenuTemplate } from '@/components';

import { MenuItem } from './MenuTemplate.types';

const categories: MenuItem[] = [
  {
    name: 'Entertainment',
    description: 'Movies, TV Shows, Music, Books, Sci-fi, and more',
  },
  {
    name: 'Technology',
    description:
      'Computers, Softwares, Mobiles, Gadgets, Programming, and more',
  },
  {
    name: 'FOSS',
    description: 'Free and Open Source Software, Bitcoin, Nostr, and more',
  },
  {
    name: 'Global Perspectives',
    description:
      'Economics, Politics, Environment, Society, Governance, and more',
  },
  {
    name: 'Fashion & Style',
    description: 'Fashion Trends, Outfits, Accessories, and more',
  },
  {
    name: 'Food & Cooking',
    description: 'Recipes, Cooking Tips, Foodie Culture, and more',
  },
  {
    name: 'Arts & Creativity',
    description:
      'Visual Arts, Graphic Design, Photography, Crafts, DIY Projects, and more',
  },
  {
    name: 'Sports & Fitness',
    description: 'Fitness Routines, Sports, and more',
  },
  {
    name: 'Home & Decor',
    description: 'Home Decor Ideas, Interior Design, and more',
  },
  {
    name: 'Travel & Nature',
    description: 'Travel Destinations, Nature, Outdoor Adventures, and more',
  },
  {
    name: 'Science & Education',
    description: 'Science, Education, Engineering, Medicine, and more',
  },
  {
    name: 'Business & Entrepreneurship',
    description: 'Business, Entrepreneurship, Startups, and more',
  },
  {
    name: 'Jobs & Career',
    description:
      'Job Opportunities, Career Tips, Industry Insights, Professional Development, and more',
  },
  {
    name: 'Family & Mindfulness',
    description:
      'Parenting Tips, Family Life, Relationships, Mindfulness, Wellness, and more',
  },
  {
    name: 'History & Culture',
    description: 'Historical Events, Culture Trends, and more',
  },
];

const CategoryMenu = () => {
  const [selected, setSelected] = useState<string>(categories[0].name);

  return (
    <>
      <MenuTemplate
        items={categories}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default CategoryMenu;
