import { Popover } from '@headlessui/react';

import { Board } from '@/logic/types';

import { IPopoverButton } from '../types';
import { ActionButton } from './ActionButton';
import { EditButtons } from './EditButtons';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { PopoverButton } from './PopoverButton';
import { TransitionWrapper } from './TransitionWrapper';
import { joinClassNames } from '@/logic/utils';

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
}: {
  board: Board;
  pinIndex?: number;
  actionButtons?: IPopoverButton[];
  internalLinks?: string[][];
  externalLinks?: string[][];
  selfBoard: boolean;
  editType: 'pin' | 'board';
  className?: string;
  overlay?: boolean;
  slideInFrom?: 'right' | 'left';
}) => {
  if (!actionButtons && !internalLinks && !externalLinks && !selfBoard) return null;

  return (
    <Popover>
      <PopoverButton className={className} slideInFrom={slideInFrom} />

      <TransitionWrapper overlay={overlay}>
        <Popover.Panel
          className={joinClassNames(
            'm-4 absolute w-40 z-[5] rounded bg-white p-2 text-xs ring-1 ring-gray-900/20',
            className
          )}
        >
          {actionButtons &&
            actionButtons.map((button) => <ActionButton button={button} key={button.title} />)}

          {internalLinks &&
            internalLinks.map(([url, label]) => <InternalLink label={label} url={url} key={url} />)}

          {externalLinks &&
            externalLinks.map(([url, label]) => <ExternalLink label={label} url={url} key={url} />)}

          {selfBoard && <EditButtons editType={editType} board={board} pinIndex={pinIndex} />}
        </Popover.Panel>
      </TransitionWrapper>
    </Popover>
  );
};
