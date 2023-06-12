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

import { toggleDrawer } from '@/utils';

import { useCurrentParams, useMetadata } from '@/hooks';

const Navbar = () => {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/my');

  const { boardName } = useCurrentParams();

  const pubkey = usePubkey();
  const { picture, npub } = useMetadata({ pubkey });

  return (
    <>
      <div className="navbar fixed top-0 z-30 gap-4 bg-base-200 border-b-2 border-neutral-700 items-center">
        {isDashboard && (
          <>
            <div className="flex-none lg:hidden">
              <label
                htmlFor="boards-drawer"
                className="btn btn-square btn-ghost btn-sm"
                onClick={() => toggleDrawer('pins-drawer', false)}
              >
                <FolderIcon className="h-5 w-5 lg:h-6 lg:w-6" />
              </label>
            </div>
            {boardName && (
              <div className="flex-none xl:hidden">
                <label
                  htmlFor="pins-drawer"
                  className="btn btn-square btn-ghost btn-sm"
                  onClick={() => toggleDrawer('boards-drawer', false)}
                >
                  <PaperClipIcon className="h-5 w-5 lg:h-6 lg:w-6" />
                </label>
              </div>
            )}
          </>
        )}

        <div className="flex-1 gap-2">
          <a className="flex items-center cursor-pointer gap-2 text-lg md:text-xl">
            <img
              src="/pinstr.png"
              alt="Pinstr.app"
              className="h-5 w-5 md:h-6 md:w-6"
            />
            Pinstr
          </a>
        </div>

        {!!pubkey && (
          <div className="flex-none">
            <Link prefetch={false} href={`/p/${npub}`} className="">
              <div className="avatar">
                <div className="w-10 rounded-xl">
                  <img src={picture || '/pinstr.png'} />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
