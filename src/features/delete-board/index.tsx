import { useState } from 'react';

import { RemoveConfirmModal } from '@/shared/components';
import { useMutateBoard } from '@/shared/hooks/mutations';
import { Board } from '@/shared/types';

type Props = {
  board: Board;
};

export const DeleteBoard = ({ board }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteBoard } = useMutateBoard();

  return (
    <>
      {isModalOpen && (
        <RemoveConfirmModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => deleteBoard(board)}
        />
      )}

      <div className="py-6">
        <div className="flex flex-col rounded-md border border-dashed border-red-300">
          <div className="w-full bg-red-50 shadow-inner px-4 py-2 border-b border-red-100 rounded-t-md">
            <span className="text-sm font-bold text-red-400">Danger Zone</span>
          </div>
          <div className="p-4 flex items-center">
            <div className="text-xs">Deleting a board is permanent and cannot be undone.</div>
            <button
              type="button"
              className="ml-auto rounded-md border border-red-200 px-4 py-1 text-sm font-bold leading-6 text-red-400 hover:text-red-500 hover:border-red-300"
              onClick={() => setIsModalOpen(true)}
            >
              Delete Board
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
