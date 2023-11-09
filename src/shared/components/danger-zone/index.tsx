import { useState } from 'react';

import { Button, RemoveConfirmModal, Text } from '@/shared/components';

type Props = {
  title?: string;
  message?: string;
  button: {
    label?: string;
    onConfirm: () => void;
  };
};

export const DangerZone = ({
  title = 'Danger Zone',
  message = 'Deleting a board is permanent and cannot be undone.',
  button,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <RemoveConfirmModal onClose={() => setIsModalOpen(false)} onConfirm={button.onConfirm} />
      )}

      <div className="py-6">
        <div className="flex flex-col rounded-md border border-dashed border-red-300">
          <div className="w-full bg-red-50 shadow-inner px-4 py-2 border-b border-red-100 rounded-t-md">
            <span className="text-sm font-bold text-red-400">{title}</span>
          </div>
          <div className="p-4 flex items-center">
            <Text variant="xs">{message}</Text>

            <Button
              variant="danger"
              className="ml-auto"
              label={button.label || 'Delete Board'}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
