import { Format } from '@/shared/types';

export const getBoardHeadersByFormat = (format: Format): string[] => {
  switch (format) {
    case Format.Text:
      return ['Text:Content', 'Text:Title', 'Image:Image'];
    case Format.Link:
      return ['Link:Content', 'Text:Title', 'Image:Image'];
    case Format.Image:
      return ['Image:Content', 'Text:Title'];
    case Format.Video:
      return ['Video:Content', 'Text:Title'];
    case Format.Profile:
      return ['Profile:Content'];
    case Format.Note:
      return ['Note:Content'];
    default:
      return [];
  }
};
