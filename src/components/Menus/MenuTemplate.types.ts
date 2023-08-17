export interface MenuItem {
  title: string;
  description?: string;
  value?: string;
}

export interface MenuProps {
  items: MenuItem[];
  selected: MenuItem | null;
  setSelected: (item: MenuItem) => void;
}
