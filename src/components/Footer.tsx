export const Footer = () => {
  return (
    <footer className="fixed z-10 bottom-0 left-0 right-0 flex items-center px-4 py-1 text-gray-500 text-[0.66rem] font-semibold border-t-[1px] border-gray-300 bg-gradient-to-t from-gray-100 to-white md:text-xs">
      <div className="flex flex-col gap-1 items-start md:items-center md:flex-row">
        <a
          href="https://primal.net/profile/npub18c556t7n8xa3df2q82rwxejfglw5przds7sqvefylzjh8tjne28qld0we7"
          target="_blank"
          rel="noreferrer"
          className="hover:underline hover:text-gray-900"
        >
          Made with <span className="text-red-500">♥️</span> by Sepehr
        </a>

        <span className="text-gray-200 mx-2 cursor-default hidden md:block">
          |
        </span>

        <a
          href="https://opensats.org/blog/nostr-grants-july-2023"
          target="_blank"
          rel="noreferrer"
          className="hover:underline hover:text-gray-900"
        >
          Supported with <span className="text-yellow-500">⚡️</span> by
          OpenSats
        </a>
      </div>

      <div className="ml-auto flex flex-col gap-1 items-end md:items-center md:flex-row">
        <a
          href="https://nostr.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center hover:text-gray-900 hover:underline"
        >
          What is nostr?
        </a>

        <span className="text-gray-200 mx-2 cursor-default hidden md:block">
          |
        </span>

        <a
          href="https://github.com/sepehr-safari/pinstr"
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:text-gray-900 hover:underline"
        >
          Github
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            className="ml-1 h-5 w-5 hidden md:block"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};
