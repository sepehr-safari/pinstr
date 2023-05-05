'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { memo, useState } from 'react';

type BoardItemParams = {
  name: string;
  isActive: boolean;
  icon: React.ReactNode;
  removeHandler: () => void;
};

const Item = ({ name, isActive, icon, removeHandler }: BoardItemParams) => {
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

  return (
    <>
      <li key={name} className="group">
        <div className={isActive ? 'active' : 'py-0'}>
          <div className="w-5 h-5 flex">{icon}</div>

          <Link prefetch={false} href={`/my/${name}`} className="w-full p-2">
            {name}
          </Link>

          {showRemoveConfirmation && (
            <button
              className="ml-auto btn btn-ghost btn-square btn-xs opacity-0 group-hover:opacity-100"
              onClick={() => removeHandler()}
            >
              <CheckIcon className="w-5 h-5" />
            </button>
          )}

          <button
            className="ml-auto btn btn-ghost btn-square btn-xs opacity-0 group-hover:opacity-100"
            onClick={() => setShowRemoveConfirmation((prev) => !prev)}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </li>
    </>
  );
};

export default memo(Item);
