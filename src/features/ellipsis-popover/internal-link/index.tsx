import { ArrowUturnRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const InternalLink = ({ url, label }: { url: string; label: string }) => {
  return (
    <>
      <Link
        to={url}
        className="group flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <ArrowUturnRightIcon className="w-4 h-4" />
        <span className="font-semibold">{label}</span>
      </Link>
    </>
  );
};
