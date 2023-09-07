import { useSearchParams } from 'react-router-dom';

export const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    tag: {
      value: searchParams.get('tag') || undefined,
      set: (tag: string) =>
        setSearchParams((prev) => {
          tag == '' ? prev.delete('tag') : prev.set('tag', tag);
          return prev;
        }),
    },
    category: {
      value: searchParams.get('category') || undefined,
      set: (category: string) =>
        setSearchParams((prev) => {
          category.startsWith('All') ? prev.delete('category') : prev.set('category', category);
          return prev;
        }),
    },
    type: {
      value: searchParams.get('type') || undefined,
      set: (type: string) =>
        setSearchParams((prev) => {
          type.startsWith('All') ? prev.delete('type') : prev.set('type', type);
          return prev;
        }),
    },
    from: {
      value: searchParams.get('from') || undefined,
      set: (from: string) =>
        setSearchParams((prev) => {
          from.startsWith('All') ? prev.delete('from') : prev.set('from', from);
          return prev;
        }),
    },
  };
};
