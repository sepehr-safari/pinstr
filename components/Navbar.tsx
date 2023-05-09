'use client';

import {
  FolderIcon,
  HashtagIcon,
  HomeIcon,
  PaperClipIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePubkey } from 'nostr-hooks';
import { useCallback } from 'react';

import { useCurrentParams, useMetadata } from '@/hooks';

const Navbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/my');

  const { boardName } = useCurrentParams();

  const pubkey = usePubkey();
  const { picture, npub } = useMetadata({ pubkey });

  const uncheckById = useCallback((id: string) => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    if (!checkbox) return;

    checkbox.checked = false;
  }, []);

  return (
    <>
      <div className="navbar gap-2 bg-base-200 border-b-[1px] border-neutral-700">
        {isDashboard && (
          <>
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
          </>
        )}

        <div className="flex-1 gap-2">
          <a className="btn btn-ghost gap-2 text-xl">
            <img src="/pinstr.png" alt="Pinstr.app" className="h-6 w-6" />
            Pinstr
          </a>
        </div>

        <div className="flex-none">
          <Link
            prefetch={false}
            href="/feed"
            className="btn-ghost btn rounded-full p-3 md:rounded-lg"
          >
            <div className="block w-6 md:hidden">
              <HomeIcon />
            </div>
            <div className="hidden md:block">Feed</div>
          </Link>
          <Link
            prefetch={false}
            href="/explore"
            className="btn-ghost btn rounded-full p-3 md:rounded-lg"
          >
            <div className="block w-6 md:hidden">
              <HashtagIcon />
            </div>
            <div className="hidden md:block">Explore</div>
          </Link>
          <Link
            prefetch={false}
            href="/my"
            className="btn-ghost btn rounded-full p-3 md:rounded-lg"
          >
            <div className="block w-6 md:hidden">
              <UserIcon />
            </div>
            <div className="hidden md:block">My</div>
          </Link>
        </div>

        <div className="flex-none">
          <Link prefetch={false} href={`/p/${npub}`} className="">
            <div className="avatar">
              <div className="w-10 rounded-xl">
                <img src={picture || '/pinstr.png'} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
