import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  PaperClipIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useBoardSummary } from './hooks';

import { ellipsis, formatRelativeTime, loader } from '@/shared/utils';

import { Spinner } from '@/shared/components';

import { EllipsisPopover, CommentsCard } from '@/features';
import { BoardCommentButton, BoardLikeButton, BoardZapButton } from '@/features/reaction-buttons';

export const BoardSummary = () => {
  const { board, setCreatePinParams, setEditBoardParams, selfBoard, commentsParam } =
    useBoardSummary();

  const copyRawData = useCallback(() => {
    if (!board) return;

    try {
      navigator.clipboard.writeText(JSON.stringify(board.event.rawEvent()));

      toast.success('Copied to clipboard', { type: 'success' });
    } catch (error) {
      toast.error('Error in copying to clipboard', { type: 'error' });
    }
  }, [board]);

  const exportAsCSV = useCallback(() => {
    try {
      if (!board) return;

      const csv = [board.headers.join(','), ...board.pins.map((pin) => pin.join(','))].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${board.title}.csv`;
      anchor.click();
      window.URL.revokeObjectURL(url);

      toast.success('Exported as CSV', { type: 'success' });
    } catch (error) {
      toast.error('Error in exporting as CSV', { type: 'error' });
    }
  }, [board]);

  if (board == undefined) {
    return (
      <div className="h-32 flex justify-center items-center overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <Spinner />
      </div>
    );
  }

  if (board == null) {
    return null;
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow-md text-xs xl:rounded-xl">
        <div className="w-full group flex flex-col gap-4 pt-4 justify-between items-center divide-y">
          <div className="flex flex-col gap-2 text-xs font-light text-gray-400">
            <div className="flex w-full justify-center items-center gap-4">
              {board.event.created_at && (
                <>
                  <span>{formatRelativeTime(board.event.created_at)}</span>

                  <span>|</span>
                </>
              )}

              <span className="flex items-center">
                <Link to={`/?category=${board.category}`} className="hover:underline">
                  {board.category}
                </Link>
              </span>
            </div>

            {board.tags.length > 0 && (
              <div className="px-4 flex justify-center gap-x-4 gap-y-2 flex-wrap">
                {board.tags.map((tag, index) => (
                  <Link to={`/?tag=${tag}`} key={index} className="hover:underline">
                    {ellipsis(tag, 15)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full">
            <EllipsisPopover
              board={board}
              actionButtons={[
                {
                  title: 'Copy raw data',
                  icon: DocumentDuplicateIcon,
                  onClick: copyRawData,
                },
                { title: 'Export as CSV', icon: ArrowDownTrayIcon, onClick: exportAsCSV },
                // { title: 'Share', icon: ShareIcon, onClick: () => {} },
              ]}
              overlay={false}
              className="top-3 right-0 rounded-r-none"
            />

            <div className="pt-4 px-6 flex flex-col gap-4 w-full items-center text-center">
              <div className="w-40 h-32 rounded-md overflow-hidden">
                <img
                  src={loader(board.image, { w: 500, h: 400 })}
                  alt={board.title}
                  className="w-full h-full bg-gray-200 text-gray-200"
                  loading="lazy"
                />
              </div>

              <h3 className="text-base font-semibold tracking-tight leading-5 text-gray-900 [overflow-wrap:anywhere]">
                {ellipsis(board.title, 500)}
              </h3>

              <p className="text-xs font-light text-gray-600 [overflow-wrap:anywhere]">
                {ellipsis(board.description, 1000)}
              </p>

              {selfBoard && (
                <>
                  <div className="flex gap-2 shrink-0 w-full max-w-xs">
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                      onClick={() => setEditBoardParams()}
                    >
                      <PencilIcon className="-ml-2 w-4 h-4" />
                      <span className="ml-2">Edit Board</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-gray-100 w-full py-2 text-xs font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                      onClick={() => setCreatePinParams()}
                    >
                      <PaperClipIcon className="-ml-2 w-4 h-4" />
                      <span className="ml-2">Add Pin</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 w-full h-10 divide-x">
            <BoardLikeButton board={board} bgHover={true} />
            <BoardZapButton board={board} bgHover={true} />
            <BoardCommentButton board={board} bgHover={true} />
          </div>
        </div>
      </div>

      {commentsParam != null && <CommentsCard board={board} />}
    </>
  );
};
