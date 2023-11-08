import { PinWizard } from '@/features';
import { Board } from '@/shared/types';

export const Page = () => {
  return (
    <>
      <PinWizard board={{} as Board} pinIndex={0} />
    </>
  );
};
