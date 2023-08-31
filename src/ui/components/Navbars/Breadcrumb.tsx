import { HomeIcon } from '@heroicons/react/20/solid';
import { nip19 } from 'nostr-tools';
import { Link, useParams } from 'react-router-dom';

import { useAuthor } from '@/logic/queries';

export const Breadcrumb = () => {
  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;
  const { data: author } = useAuthor(hex);

  return (
    <nav className="flex justify-center xl:justify-start" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link to="/" className="text-gray-300 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {author && (
          <li>
            <div className="flex items-center max-w-[12rem] md:max-w-xs">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={'/p/' + npub}
                className="ml-2 truncate text-xs font-light text-gray-400 hover:text-gray-700"
              >
                {author.displayName}
              </Link>
            </div>
          </li>
        )}
        {!!title && (
          <li>
            <div className="flex items-center max-w-[12rem] md:max-w-xs">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={'/p/' + npub + '/' + title}
                className="ml-2 truncate text-xs font-light text-gray-400 hover:text-gray-700"
              >
                {title}
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};
