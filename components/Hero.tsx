import Link from 'next/link';

const Hero = () => {
  return (
    <>
      <div
        className="hero h-full"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
