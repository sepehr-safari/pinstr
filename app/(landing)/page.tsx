'use client';

import { useRouter } from 'next/navigation';
import { usePubkey } from 'nostr-hooks';
import { useEffect } from 'react';

import { Hero } from '@/components';

const Home = () => {
  const pubkey = usePubkey();
  const router = useRouter();

  useEffect(() => {
    if (!!pubkey) {
      router.replace('/explore');
    }
  }, [router, pubkey]);

  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
