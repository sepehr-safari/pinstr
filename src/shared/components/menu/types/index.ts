export type MenuItem = {
  title: string;
  description?: string;
  value?: string;
  color?: `text-${string}`;
  icon?: {
    node: React.ReactNode;
    bgColor?: `bg-${string}`;
  };
};
