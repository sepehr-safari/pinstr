import { joinClassNames } from '@/shared/utils';

const variantClasses = {
  primary:
    'block w-full rounded-md border-0 py-1.5 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600',
};

type Props = {
  variant?: keyof typeof variantClasses;
};

export const Input = ({
  variant = 'primary',
  type = 'text',
  autoComplete = 'off',
  className,
  ...props
}: Props & React.InputHTMLAttributes<HTMLInputElement>) => {
  const joinedClassNames = joinClassNames(variantClasses[variant], className || '');

  return <input type={type} autoComplete={autoComplete} className={joinedClassNames} {...props} />;
};
