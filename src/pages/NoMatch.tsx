import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <main className="relative isolate h-full">
      <img
        src="https://source.unsplash.com/random/1280x720/?bird"
        alt="Bird"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center bg-gray-100 text-gray-100"
      />
      <div className="flex flex-col justify-center items-center h-full bg-black/30">
        <p className="text-base font-semibold leading-8 text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-white/70 sm:mt-6">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/" className="text-sm font-semibold leading-7 text-white">
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
