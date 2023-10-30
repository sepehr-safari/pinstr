import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMemo } from 'react';

import {
  useEditBoardParams,
  useEditPinParams,
  useRemoveBoardParams,
  useRemovePinParams,
} from '@/shared/hooks/common';
import type { Board } from '@/shared/types';

import { ActionButton } from '../action-button';
import { PopoverButton } from '../types';

export const EditButtons = ({
  board,
  pinIndex,
  editType,
}: {
  board: Board;
  pinIndex?: number | undefined;
  editType: 'pin' | 'board';
}) => {
  const { setEditBoardParams } = useEditBoardParams(board);
  const { setRemoveBoardParams } = useRemoveBoardParams(board);
  const { setEditPinParams } = useEditPinParams(board, pinIndex);
  const { setRemovePinParams } = useRemovePinParams(board, pinIndex);

  const buttons = useMemo<PopoverButton[]>(
    () => [
      {
        title: 'Edit',
        icon: PencilIcon,
        onClick: editType == 'board' ? setEditBoardParams : setEditPinParams,
      },
      {
        title: 'Remove',
        icon: TrashIcon,
        color: 'text-red-600',
        onClick: editType == 'board' ? setRemoveBoardParams : setRemovePinParams,
      },
    ],
    [editType, setEditBoardParams, setEditPinParams, setRemoveBoardParams, setRemovePinParams]
  );

  return (
    <>
      {buttons.map((button, index) => (
        <ActionButton key={button.title + index} button={button} />
      ))}
    </>
  );
};
