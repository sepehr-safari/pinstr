'use client';

import { CheckIcon, FolderIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { useDrawerItem } from '@/hooks';
import { memo } from 'react';

interface BoardItemParams {
  id: string;
  title: string;
  isActive: boolean;
}

const Item = ({ id, title, isActive }: BoardItemParams) => {
  const { confirmRemove, setShowRemoveConfirmation, showRemoveConfirmation } =
    useDrawerItem(id);

  return (
    <>
      <li key={id} className="group">
        <div className={isActive ? 'active' : 'py-0'}>
          <div>
            <FolderIcon className="h-4 w-4" />
          </div>

          <Link prefetch={false} href={`/my/${id}`} className="w-full p-2">
            {title}
          </Link>

          {showRemoveConfirmation && (
            <button
              className="ml-auto btn btn-ghost btn-square btn-xs opacity-0 group-hover:opacity-100"
              onClick={() => confirmRemove()}
            >
              <CheckIcon className="h-4 w-4" />
            </button>
          )}

          <button
            className="ml-auto btn btn-ghost btn-square btn-xs opacity-0 group-hover:opacity-100"
            onClick={() => setShowRemoveConfirmation((prev) => !prev)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </li>
    </>
  );
};

export default memo(Item);
