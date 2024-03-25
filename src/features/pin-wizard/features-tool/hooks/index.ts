import { useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';
import { Format } from '@/shared/types';

import { PRESERVED_TITLES } from '../../config';
import { FeaturesToolProps } from '../types';

export const useFeaturesTool = ({ initialBoard, setPartialBoardItem }: FeaturesToolProps) => {
  const [isShowingFeaturesTool, setIsShowingFeaturesTool] = useState(false);
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<Format>(Format.Image);

  const { toast } = useToast();

  const insertFeature = () => {
    if (
      !title ||
      PRESERVED_TITLES.includes(title) ||
      initialBoard.headers?.map((h) => h.split(':')[1]).includes(title)
    ) {
      toast({ description: 'Invalid title! Try a unique one!', variant: 'destructive' });

      return;
    }

    setPartialBoardItem('headers', [...(initialBoard.headers || []), `${format}:${title}`]);

    setPartialBoardItem(
      'pins',
      initialBoard.pins?.map((pin) => [...pin, ''])
    );

    toast({ description: 'Feature inserted!', variant: 'success' });

    setIsShowingFeaturesTool(false);

    setTitle('');
    setFormat(Format.Image);
  };

  return {
    isShowingFeaturesTool,
    setIsShowingFeaturesTool,
    title,
    setTitle,
    format,
    setFormat,
    insertFeature,
  };
};
