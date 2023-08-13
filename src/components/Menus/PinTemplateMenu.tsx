import { useEffect } from 'react';

import { MenuTemplate } from '@/components/Menus';

import { MenuItem } from './MenuTemplate.types';

const templates: MenuItem[] = [
  {
    name: 'Plain Text',
    description:
      'Use this template to create a board of plain text items (e.g. a board of your favorite books)',
  },
  {
    name: 'Links',
    description:
      'Use this template to create a board of links (e.g. a board of your favorite websites)',
  },
  {
    name: 'Pictures',
    description:
      'Use this template to create a board of pictures (e.g. a board of your favorite pictures)',
  },
  {
    name: 'Videos',
    description:
      'Use this template to create a board of videos (e.g. a board of your favorite videos)',
  },
];

export default function PinTemplateMenu({
  template,
  setTemplate,
}: {
  template: MenuItem | null;
  setTemplate: (item: MenuItem) => void;
}) {
  useEffect(() => {
    setTemplate(templates[0]);
  }, []);

  return (
    <>
      <MenuTemplate
        items={templates}
        selected={template}
        setSelected={setTemplate}
      />
    </>
  );
}
