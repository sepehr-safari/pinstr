import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useMutateBoard } from '@/logic/mutations';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';

import { IPopoverButton } from '../types';
import { ActionButton } from './ActionButton';
import { useEditBoard } from '@/logic/hooks/useEditBoard';
import { useEditPin, useRemoveBoard, useRemovePin } from '@/logic/hooks';

export const EditButtons = ({
  board,
  pinIndex,
  editType,
}: {
  board: Board;
  pinIndex?: number | undefined;
  editType: 'pin' | 'board';
}) => {
  const { editBoard } = useEditBoard(board);
  const { removeBoard } = useRemoveBoard(board);
  const { editPin } = useEditPin(board, pinIndex);
  const { removePin } = useRemovePin(board, pinIndex);

  const buttons = useMemo<IPopoverButton[]>(
    () => [
      {
        title: 'Edit',
        icon: PencilIcon,
        onClick: editType == 'board' ? editBoard : editPin,
      },
      {
        title: 'Remove',
        icon: TrashIcon,
        color: 'text-red-600',
        onClick: editType == 'board' ? removeBoard : removePin,
      },
    ],
    []
  );

  return (
    <>
      {buttons.map((button, index) => (
        <ActionButton key={button.title + index} button={button} />
      ))}
    </>
  );
};
