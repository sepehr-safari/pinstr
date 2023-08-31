import { useLocation } from 'react-router-dom';

import { joinClassNames } from '@/logic/utils';

import { Breadcrumb } from '@/ui/components/Navbars';

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div
      className={joinClassNames(
        'w-full h-full px-8 pb-6 xl:px-0',
        state?.backgroundLocation ? 'xl:mt-16' : 'xl:mt-28'
      )}
    >
      <div className="mb-4 mt-3">
        <Breadcrumb />
      </div>

      {children}
    </div>
  );
};
