import { HomeIcon } from '@heroicons/react/20/solid';
import { Link, useParams } from 'react-router-dom';

export default function Breadcrumb() {
  const { npub, boardName } = useParams();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link to="/" className="text-gray-300 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {!!npub && (
          <li>
            <div className="flex items-center">
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
                className="ml-2 text-sm font-light text-gray-400 hover:text-gray-700"
              >
                {npub}
              </Link>
            </div>
          </li>
        )}
        {!!boardName && (
          <li>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <Link
                to={'/p/' + npub + '/' + boardName}
                className="ml-2 text-sm font-light text-gray-400 hover:text-gray-700"
              >
                {boardName}
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}
