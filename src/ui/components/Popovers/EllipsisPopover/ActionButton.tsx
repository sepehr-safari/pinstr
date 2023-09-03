import { joinClassNames } from '@/logic/utils';

import { IPopoverButton } from '../types';

export const ActionButton = ({ button }: { button: IPopoverButton }) => {
  return (
    <>
      <div
        className="group flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
        onClick={button.onClick}
      >
        {button.icon && <button.icon className="w-4 h-4" />}

        <span className={joinClassNames('font-semibold', button.color || 'text-gray-900')}>
          {button.title}
        </span>
      </div>
    </>
  );
};
