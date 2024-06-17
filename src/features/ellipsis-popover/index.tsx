import { Popover, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import type { Board } from '@/shared/types';

import { joinClassNames } from '@/shared/utils';

import { ActionButton } from './action-button';
import { EditButtons } from './edit-buttons';
import { ExternalLink } from './external-link';
import { InternalLink } from './internal-link';

import type { PopoverButton } from './types';

interface Params {
  board: Board;
  pinIndex?: number;
  actionButtons?: PopoverButton[];
  internalLinks?: string[][];
  externalLinks?: string[][];
  selfBoard?: boolean;
  editType?: 'pin' | 'board';
  className?: string;
  overlay?: boolean;
  slideInFrom?: 'right' | 'left';
  buttonTheme?: 'light' | 'dark';
  onClick?: () => void;
}

// TODO: refactor the whole ellipsis popover - replace popover with menu component
// just get some menu items with their onClick functions and render them

export const EllipsisPopover = ({
  board,
  pinIndex,
  actionButtons,
  internalLinks,
  externalLinks,
  selfBoard,
  editType,
  className = 'top-2 right-2',
  overlay = true,
  slideInFrom = 'right',
  buttonTheme = 'light',
  onClick,
}: Params) => {
  const hasPublicActionButtons = useMemo(
    () => !!actionButtons && actionButtons.filter((btn) => !btn.private).length > 0,
    [actionButtons]
  );

  if (!hasPublicActionButtons && !internalLinks && !externalLinks && !selfBoard) return null;

  return (
    <Popover>
      <Popover.Button
        className={joinClassNames(
          buttonTheme == 'light'
            ? 'text-gray-500 bg-black/5 hover:bg-black/10'
            : 'text-white bg-black/30 hover:bg-black/50',
          slideInFrom == 'right' ? 'translate-x-2' : '-translate-x-2',
          'absolute z-[4] outline-none rounded-full p-1 duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0',
          className
        )}
      >
        <EllipsisHorizontalIcon className="h-6 w-6" />
      </Popover.Button>

      <Transition
        enter="duration-200"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <Popover.Panel
          onClick={onClick}
          className={joinClassNames(
            'm-4 absolute w-40 z-[5] rounded bg-white p-2 text-xs ring-1 ring-gray-900/20',
            className
          )}
        >
          {actionButtons &&
            actionButtons.map((button) => {
              if (button.private && !selfBoard) return null;

              return <ActionButton button={button} key={button.title} />;
            })}

          {internalLinks &&
            internalLinks.map(([url, label]) => <InternalLink label={label} url={url} key={url} />)}

          {externalLinks &&
            externalLinks.map(([url, label]) => <ExternalLink label={label} url={url} key={url} />)}

          {selfBoard && editType && (
            <EditButtons editType={editType} board={board} pinIndex={pinIndex} />
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
