import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  PaperClipIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { formatRelative } from 'date-fns';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { BoardBooster, CommentsCard, EllipsisPopover } from '@/features';
import { BoardCommentButton, BoardLikeButton, BoardZapButton } from '@/features/reaction-buttons';

import { Button, Spinner } from '@/shared/components';
import { ellipsis, loader } from '@/shared/utils';

import { useBoardSummary } from './hooks';

export const BoardSummary = () => {
  const { board, selfBoard, commentsParam, navigate, toast } = useBoardSummary();

  const copyRawData = useCallback(() => {
    if (!board) return;

    try {
      navigator.clipboard.writeText(JSON.stringify(board.event.rawEvent()));

      toast({ description: 'Copied to clipboard', variant: 'success' });
    } catch (error) {
      toast({ description: 'Error in copying to clipboard', variant: 'destructive' });
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

      toast({ description: 'Exported as CSV', variant: 'success' });
    } catch (error) {
      toast({ description: 'Error in exporting as CSV', variant: 'destructive' });
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
                  <span>{formatRelative(new Date(board.event.created_at * 1000), new Date())}</span>

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
                  <div className="flex gap-2 shrink-0 w-full">
                    <Button
                      variant="secondary"
                      block
                      icon={<PencilIcon />}
                      label="Edit Board"
                      onClick={() =>
                        navigate(
                          `/p/${board.event.author.npub}/${encodeURIComponent(
                            board.title
                          )}/edit-board`
                        )
                      }
                    />
                    <Button
                      variant="secondary"
                      block
                      icon={<PaperClipIcon />}
                      label="Add Pin"
                      onClick={() =>
                        navigate(
                          `/p/${board.event.author.npub}/${encodeURIComponent(board.title)}/add-pin`
                        )
                      }
                    />
                  </div>
                </>
              )}

              <BoardBooster board={board} />
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
