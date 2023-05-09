'use client';

import {
  Bars3BottomLeftIcon,
  FolderIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';

import { useCurrentParams } from '@/hooks';
import { useCallback } from 'react';

const Navbar = () => {
  const { boardName, pinName } = useCurrentParams();

  const uncheckById = useCallback((id: string) => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    checkbox.checked = false;
  }, []);

  return (
    <>
      <div className="navbar gap-2 bg-base-200 border-b-[1px] border-neutral-700">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="boards-drawer"
            className="btn btn-square btn-ghost"
            onClick={() => uncheckById('pins-drawer')}
          >
            <FolderIcon className="h-6 w-6" />
          </label>
        </div>
        {boardName && (
          <div className="flex-none xl:hidden">
            <label
              htmlFor="pins-drawer"
              className="btn btn-square btn-ghost"
              onClick={() => uncheckById('boards-drawer')}
            >
              <PaperClipIcon className="h-6 w-6" />
            </label>
          </div>
        )}
        <div className="flex-1 gap-2">
          <a className="btn btn-ghost gap-2 text-xl">
            <img src="/pinstr.png" alt="Pinstr.app" className="h-6 w-6" />
            Pinstr
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
