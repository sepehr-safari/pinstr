import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Params = {
  board: string;
};

const PinsHeader = ({ board }: Params) => {
  return (
    <>
      <div className="flex justify-between items-center text-xs text-neutral-400 py-2 px-4">
        <span>My Pins</span>
        <Link
          href={`/my/${encodeURIComponent(board)}`}
          className="btn btn-xs btn-square btn-ghost"
        >
          <PlusIcon className="w-5 h-5" />
        </Link>
      </div>
    </>
  );
};

export default PinsHeader;
