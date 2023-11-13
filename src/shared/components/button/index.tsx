import { joinClassNames } from '@/shared/utils';

const variantClasses = {
  primary: 'bg-gray-900 text-white hover:bg-gray-700',
  secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900',
  accent: 'bg-purple-800 text-white hover:bg-purple-600',
  outline:
    'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100 hover:border-gray-400 hover:shadow-lg',
  text: 'bg-transparent text-gray-900 hover:underline',
  danger:
    'bg-transparent border border-red-200 text-red-400 hover:text-red-500 hover:border-red-300',
};

const sizeClasses = {
  none: 'p-0',
  sm: 'px-2 py-1.5',
  md: 'px-3 py-2',
  lg: 'px-5 py-2.5',
};

type Props = {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  rounded?: boolean;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
  block?: boolean;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  rounded = false,
  icon,
  label,
  disabled = false,
  block = false,
  className = '',
  onClick,
}: Props) => {
  const joinedClassNames = joinClassNames(
    'flex items-center justify-center text-xs font-semibold focus:outline-none',
    sizeClasses[size],
    variantClasses[variant],
    rounded ? 'rounded-full' : 'rounded-md',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    block ? 'w-full' : '',
    className
  );

  return (
    <button className={joinedClassNames} disabled={disabled} onClick={onClick}>
      {icon && <div className="-ml-1 w-4 h-4 flex items-center">{icon}</div>}
      {label && <span className={joinClassNames(icon ? 'ml-2' : '')}>{label}</span>}
    </button>
  );
};
