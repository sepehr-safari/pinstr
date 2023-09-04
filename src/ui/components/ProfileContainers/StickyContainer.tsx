import { useLocation } from 'react-router-dom';

import { joinClassNames } from '@/logic/utils';

export const StickyContainer = ({
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
      className={joinClassNames(
        'flex flex-col gap-4 w-full xl:max-w-xs',
        'xl:self-start xl:sticky',
        state?.backgroundLocation ? 'xl:top-10' : 'mt-24 xl:mt-12 xl:top-24',
        className
      )}
    >
      {children}
    </div>
  );
};
