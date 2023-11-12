import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import type { Board } from '@/shared/types';

import { RemoveConfirmModal } from '@/shared/components';
import { useMutateBoard } from '@/shared/hooks/mutations';
import { useState } from 'react';
import { ActionButton } from '../action-button';
import { PopoverButton } from '../types';

export const EditButtons = ({
  board,
  editType,
  pinIndex,
}: {
  board: Board;
  editType: 'pin' | 'board';
  pinIndex?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { deleteBoard, removePin } = useMutateBoard();

  const buttons: PopoverButton[] = [
    {
      title: 'Edit',
      icon: PencilIcon,
      onClick:
        editType == 'board'
          ? () =>
              navigate(
                `/p/${board.event.author.npub}/${encodeURIComponent(board.title)}/edit-board`
              )
          : () =>
              navigate(
                `/p/${board.event.author.npub}/${encodeURIComponent(
                  board.title
                )}/edit-pin/${pinIndex}`
              ),
    },
    {
      title: 'Remove',
      icon: TrashIcon,
      color: 'text-red-600',
      onClick: () => setIsModalOpen(true),
    },
  ];

  return (
    <>
      {buttons.map((button, index) => (
        <ActionButton key={button.title + index} button={button} />
      ))}

      {isModalOpen && (
        <RemoveConfirmModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={
            editType == 'board'
              ? () => deleteBoard(board)
              : () => pinIndex && removePin(board, pinIndex)
          }
        />
      )}
    </>
  );
};
