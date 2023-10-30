import { joinClassNames } from '@/shared/utils';

const variantClasses = {
  primary: 'bg-gray-900 text-white hover:bg-gray-700',
  secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
  accent: 'bg-purple-800 text-white hover:bg-purple-600',
  outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100',
};

const sizeClasses = {
  sm: 'px-2 py-1.5',
  md: 'px-3 py-2',
  lg: 'px-5 py-2.5',
};

type Props = {
  vatiant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  rounded?: boolean;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  block?: boolean;
  className?: string;
};

export const Button = ({
  vatiant = 'primary',
  size = 'md',
  rounded = false,
  icon,
  label,
  disabled = false,
  block = false,
  className = '',
}: Props) => {
  const joinedClassNames = joinClassNames(
    'flex items-center justify-center gap-2 text-xs font-semibold focus:outline-none',
    variantClasses[vatiant],
    sizeClasses[size],
    rounded ? 'rounded-full' : 'rounded-md',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    block ? 'w-full' : '',
    className
  );

  return (
    <button className={joinedClassNames} disabled={disabled}>
      {icon && <span className="-ml-2 w-4 h-4">{icon}</span>}
      {label && <span className={joinClassNames(icon ? 'ml-2' : '')}>{label}</span>}
    </button>
  );
};
