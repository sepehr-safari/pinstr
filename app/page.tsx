'use client';

import BoardCard from '@/components/BoardCard';
import { usePubkey } from 'nostr-hooks';

const Home = () => {
  const pubkey = usePubkey();

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        {/* <h2>Welcome to Pinstr.</h2>
        <p>
          {`This is a social media app that allows you to organize and share your favorite stuff with the world.`}
        </p> */}

        <BoardCard author={pubkey} boardName="a" />
      </div>
    </>
  );
};

export default Home;
