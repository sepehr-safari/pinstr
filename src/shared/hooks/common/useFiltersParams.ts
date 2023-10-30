import { useSearchParams } from 'react-router-dom';

/**
 * A custom hook that manages the search parameters for filtering boards.
 * @returns An object containing the current value and a function to update each filter parameter.
 */
export const useFiltersParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    tag: {
      /**
       * The current value of the tag filter.
       */
      value: searchParams.get('tag') || undefined,
      /**
       * A function to update the tag filter parameter.
       * @param tag - The new value for the tag filter.
       */
      set: (tag: string) =>
        setSearchParams((prev) => {
          tag == '' ? prev.delete('tag') : prev.set('tag', tag);
          return prev;
        }),
    },
    category: {
      /**
       * The current value of the category filter.
       */
      value: searchParams.get('category') || undefined,
      /**
       * A function to update the category filter parameter.
       * @param category - The new value for the category filter.
       */
      set: (category: string) =>
        setSearchParams((prev) => {
          category.startsWith('All') ? prev.delete('category') : prev.set('category', category);
          return prev;
        }),
    },
    format: {
      /**
       * The current value of the format filter.
       */
      value: searchParams.get('format') || undefined,
      /**
       * A function to update the format filter parameter.
       * @param format - The new value for the format filter.
       */
      set: (format: string) =>
        setSearchParams((prev) => {
          format.startsWith('All') ? prev.delete('format') : prev.set('format', format);
          return prev;
        }),
    },
    from: {
      /**
       * The current value of the from filter.
       */
      value: searchParams.get('from') || undefined,
      /**
       * A function to update the from filter parameter.
       * @param from - The new value for the from filter.
       */
      set: (from: string) =>
        setSearchParams((prev) => {
          from.startsWith('All') ? prev.delete('from') : prev.set('from', from);
          return prev;
        }),
    },
  };
};
