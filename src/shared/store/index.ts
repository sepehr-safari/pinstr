import { create } from 'zustand';

import { Category, Format } from '@/shared/types';

type State = {
  filters: {
    format: Format | null;
    category: Category | null;
    tag: string | null;
  };
};

type Actions = {
  setFormatFilter: (format: Format | null) => void;
  setCategoryFilter: (category: Category | null) => void;
  setTagFilter: (tag: string | null) => void;
};

export const useLocalStore = create<State & Actions>((set) => ({
  filters: {
    format: null,
    category: null,
    tag: null,
  },
  setFormatFilter: (format) => set((state) => ({ filters: { ...state.filters, format } })),
  setCategoryFilter: (category) => set((state) => ({ filters: { ...state.filters, category } })),
  setTagFilter: (tag) => set((state) => ({ filters: { ...state.filters, tag } })),
}));
