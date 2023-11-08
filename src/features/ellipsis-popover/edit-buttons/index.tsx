import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { useEditPinParams, useRemoveBoardParams, useRemovePinParams } from '@/shared/hooks/common';
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
  const navigate = useNavigate();

  const { setRemoveBoardParams } = useRemoveBoardParams(board);
  const { setEditPinParams } = useEditPinParams(board, pinIndex);
  const { setRemovePinParams } = useRemovePinParams(board, pinIndex);

  const buttons: PopoverButton[] = [
    {
      title: 'Edit',
      icon: PencilIcon,
      onClick:
        editType == 'board'
          ? () => navigate(`/p/${board.event.author.npub}/${board.title}/edit-board`)
          : setEditPinParams,
    },
    {
      title: 'Remove',
      icon: TrashIcon,
      color: 'text-red-600',
      onClick: editType == 'board' ? setRemoveBoardParams : setRemovePinParams,
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <ActionButton key={button.title + index} button={button} />
      ))}
    </>
  );
};
