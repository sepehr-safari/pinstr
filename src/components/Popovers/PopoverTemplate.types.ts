import { ReactNode } from 'react';

export interface PopoverItem {
  name: string;
  description: string;
  onClick: () => void;
}

export interface PopoverProps {
  items: PopoverItem[];
  children: ReactNode;
}
