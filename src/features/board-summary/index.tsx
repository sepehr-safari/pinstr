import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  LinkIcon,
  PaperClipIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useBoardSummary } from './hooks';

import { ellipsis, formatRelativeTime, joinClassNames } from '@/shared/utils';

import { Button, Spinner } from '@/shared/components';

import { BoardBooster, CommentsCard } from '@/features';
import { BoardCommentButton, BoardLikeButton, BoardZapButton } from '@/features/reaction-buttons';

// TODO: refactor, also move comments to right sidebar
export const BoardSummary = () => {
  const { board, selfBoard, commentsParam, navigate, state } = useBoardSummary();

  const copyPermalink = useCallback(() => {
    if (!board) return;

    try {
      navigator.clipboard.writeText(window.location.href);

      toast.success('Copied to clipboard', { type: 'success' });
    } catch (error) {
      toast.error('Error in copying to clipboard', { type: 'error' });
    }
  }, [board]);

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
      {/* <div className="overflow-hidden bg-white shadow-md text-xs xl:rounded-xl"> */}
      <div
        className={joinClassNames(
          'w-full flex flex-col gap-4 justify-between items-center px-2 py-8',
          state?.backgroundLocation ? 'mt-40' : 'mt-52'
        )}
      >
        {selfBoard && (
          <>
            <div className="flex gap-4 max-w-xs w-full">
              <Button
                variant="primary"
                block
                icon={<PencilIcon />}
                label="Edit Board"
                onClick={() =>
                  navigate(
                    `/p/${board.event.author.npub}/${encodeURIComponent(board.title)}/edit-board`
                  )
                }
              />
              <Button
                variant="primary"
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

        <div className="flex flex-wrap justify-center gap-4">
          <BoardLikeButton board={board} bgHover={true} showCount={true} circular />
          <BoardZapButton board={board} bgHover={true} showCount={true} circular />
          <BoardCommentButton board={board} bgHover={true} showCount={true} circular />
          <Button
            className="bg-white"
            variant="outline"
            rounded
            size="sm"
            icon={<LinkIcon />}
            onClick={copyPermalink}
            tooltip="Copy Permalink"
          />
          <Button
            className="bg-white"
            variant="outline"
            rounded
            size="sm"
            icon={<ArrowDownTrayIcon />}
            onClick={exportAsCSV}
            tooltip="Export as CSV"
          />
          <Button
            className="bg-white"
            variant="outline"
            rounded
            size="sm"
            icon={<DocumentDuplicateIcon />}
            onClick={copyRawData}
            tooltip="Copy raw data"
          />
          <BoardBooster board={board} />
        </div>

        <p className="text-sm text-center [overflow-wrap:anywhere]">
          {ellipsis(board.description, 1000)}
        </p>

        <div className="flex flex-col gap-4 text-xs font-light text-gray-400">
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
            <div className="flex justify-center gap-x-4 gap-y-2 flex-wrap">
              {board.tags.map((tag, index) => (
                <Link to={`/?tag=${tag}`} key={index}>
                  <Button variant="secondary" rounded size="sm" label={ellipsis(tag, 15)} />
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          to={`/p/${board.event.author.npub}`}
          state={state}
          className="flex items-center gap-2 group"
        >
          <img
            src={board.event.author.profile?.image}
            alt={board.event.author.profile?.displayName}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold group-hover:underline">
              {board.event.author.profile?.displayName}
            </p>
            <p className="text-xs font-light">{board.event.author.profile?.nip05}</p>
          </div>
        </Link>

        {/* <div className="relative w-full">
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
          </div>
        </div> */}
      </div>
      {/* </div> */}

      {commentsParam != null && <CommentsCard board={board} />}
    </>
  );
};
