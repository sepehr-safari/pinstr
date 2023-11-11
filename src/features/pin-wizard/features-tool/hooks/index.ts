import { useState } from 'react';
import { toast } from 'react-toastify';

import { Format } from '@/shared/types';

import { PRESERVED_TITLES } from '../../config';
import { FeaturesToolProps } from '../types';

export const useFeaturesTool = ({ initialBoard, setPartialBoardItem }: FeaturesToolProps) => {
  const [isShowingFeaturesTool, setIsShowingFeaturesTool] = useState(false);
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<Format>(Format.Image);

  const insertFeature = () => {
    if (
      !title ||
      PRESERVED_TITLES.includes(title) ||
      initialBoard.headers?.map((h) => h.split(':')[1]).includes(title)
    ) {
      toast('Invalid title! Try a unique one!', {
        type: 'error',
      });

      return;
    }

    setPartialBoardItem('headers', [...(initialBoard.headers || []), `${format}:${title}`]);

    setPartialBoardItem('pins', initialBoard.pins?.map((pin) => [...pin, '']));

    toast('Feature inserted!', {
      type: 'success',
    });

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
