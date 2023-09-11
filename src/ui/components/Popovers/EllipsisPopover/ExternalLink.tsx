import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const ExternalLink = ({ url, label }: { url: string; label: string }) => {
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-100 hover:cursor-pointer"
      >
        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        <span className="font-semibold">{label}</span>
      </a>
    </>
  );
};
