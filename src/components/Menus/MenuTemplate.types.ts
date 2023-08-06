export interface MenuItem {
  name: string;
  description: string;
}

export interface MenuProps {
  items: MenuItem[];
  selected: string;
  setSelected: (name: string) => void;
}
