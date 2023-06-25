import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <div
        className="hero fixed top-0 left-0 bottom-0 right-0"
        style={{
          backgroundImage: `url("/jack_nostr.png")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Pinstr!</h1>
            <p className="mb-5">
              A decentralized and open-source social network built on top of the
              Nostr protocol which allows you to organize and share your
              favorite stuff with the world.
            </p>
            <Link prefetch={false} href="/explore" className="btn-primary btn">
              Explore
            </Link>
            {/* <Link prefetch={false} href="/login" className="btn ml-2">
              Login
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
