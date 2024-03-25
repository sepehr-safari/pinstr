import { cn } from '@/shared/utils';

const variantClasses = {
  xs: 'text-xs font-light text-gray-500',
  sm: 'text-sm text-gray-500',
  h3: 'text-base font-semibold leading-6 text-gray-900',
  h4: 'text-sm font-medium leading-6 text-gray-900',
  h5: 'text-xs font-medium leading-6 text-gray-900',
};

type Props = {
  variant: keyof typeof variantClasses;
};

export const Text = ({
  children,
  variant,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLParagraphElement>) => {
  const joinedClassNames = cn(variantClasses[variant], className || '');

  return (
    <p className={joinedClassNames} {...props}>
      {children}
    </p>
  );
};
