'use client';

import { HashtagIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePubkey } from 'nostr-hooks';

const BottomNavbar = () => {
  const pathname = usePathname();

  const pubkey = usePubkey();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-base-200 border-t-2 border-neutral-700">
      <div className="btm-nav bg-base-200 max-w-lg mx-auto border-t-2 border-neutral-700">
        {!!pubkey && (
          <Link
            prefetch={false}
            href="/feed"
            className={pathname.startsWith('/feed') ? 'active' : ''}
          >
            <div className="w-5">
              <HomeIcon />
            </div>
            <div className="btm-nav-label">Feed</div>
          </Link>
        )}
        <Link
          prefetch={false}
          href="/explore"
          className={pathname.startsWith('/explore') ? 'active' : ''}
        >
          <div className="w-5">
            <HashtagIcon />
          </div>
          <div className="btm-nav-label">Explore</div>
        </Link>
        {!!pubkey && (
          <Link
            prefetch={false}
            href="/my"
            className={pathname.startsWith('/my') ? 'active' : ''}
          >
            <div className="w-5">
              <UserIcon />
            </div>
            <div className="btm-nav-label">My</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;
