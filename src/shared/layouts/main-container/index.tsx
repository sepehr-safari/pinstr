import { joinClassNames } from '@/shared/utils';

export const MainContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={joinClassNames('w-full h-full px-4 pb-10', 'mx-auto', className)}>
      {children}
    </div>
  );
};
