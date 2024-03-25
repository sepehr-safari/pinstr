import { useLocation } from 'react-router-dom';

import { cn } from '@/shared/utils';

export const MainContainer = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div
      className={cn(
        'w-full h-full px-4 pb-16 xl:px-0 xl:pt-4',
        'mx-auto max-w-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-none',
        state?.backgroundLocation ? 'xl:mt-16' : 'xl:mt-28',
        className
      )}
    >
      {children}
    </div>
  );
};
