import { Transition } from '@headlessui/react';
import {
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useClickAway, useLongPress } from '@/logic/hooks';
import { useLocalStore } from '@/logic/store';
import { Board } from '@/logic/types';

import { WarnModal } from '@/ui/components';

export const PinContextMenu = ({
  onView,
  href,
  onClick,
  hideView,
  board,
  selfBoard,
  pinIndex,
}: {
  onView: () => void;
  href?: string;
  onClick?: () => void;
  hideView?: boolean;
  board: Board;
  selfBoard: boolean;
  pinIndex: number;
}) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [openWarnModal, setOpenWarnModal] = useState(false);

  const setBoard = useLocalStore((store) => store.setBoard);

  const [_, setSearchParams] = useSearchParams();

  const attrs = useLongPress(
    (e) => {
      e.button === 0 && setShowContextMenu(true);
    },
    {
      threshold: 500,
      onCancel: (e) => {
        if (e.button === 0 && !showContextMenu) {
          if (onClick) {
            onClick();
          } else {
            onView();
          }
        }
      },
    }
  );

  const ref = useClickAway<HTMLDivElement>(() => setShowContextMenu(false));

  return (
    <>
      <div
        {...attrs}
        ref={ref}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowContextMenu(true);
        }}
        className="absolute inset-0 flex flex-col justify-end z-[3] hover:cursor-pointer"
      />

      <WarnModal
        open={openWarnModal}
        setOpen={setOpenWarnModal}
        onRemove={() => {
          if (board) {
            setBoard(board);
            setSearchParams(
              (searchParams) => {
                searchParams.set('action', 'remove-pin');
                searchParams.set('i', pinIndex.toString());
                return searchParams;
              },
              { replace: true }
            );
          }
        }}
      />

      <Transition.Root show={showContextMenu} as={Fragment}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute inset-0 flex-grow flex justify-center items-center bg-black/80 duration-200 z-[5]"
            onClick={() => setShowContextMenu(false)}
          >
            <div className="w-1/2">
              {!hideView && (
                <button
                  type="button"
                  className="w-full flex items-center text-xs text-gray-900 font-medium py-1 px-2 bg-white/80 rounded-md hover:bg-white/90 md:py-2"
                  onClick={onView}
                >
                  <DocumentTextIcon className="w-5 h-5" />
                  <span className="-ml-4 grow">View Details</span>
                </button>
              )}

              {!!href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full flex items-center text-center text-xs text-gray-900 font-medium py-1 px-2 bg-white/80 rounded-md hover:bg-white/90 md:py-2"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                  <span className="-ml-4 grow">Open</span>
                </a>
              )}

              {selfBoard && (
                <>
                  <button
                    type="button"
                    className="mt-2 w-full flex items-center text-xs text-gray-900 font-medium py-1 px-2 bg-white/80 rounded-md hover:bg-white/90 md:py-2"
                    onClick={() => {
                      if (board) {
                        setBoard(board);
                        setSearchParams(
                          (searchParams) => {
                            searchParams.set('action', 'edit-pin');
                            searchParams.set('i', pinIndex.toString());
                            return searchParams;
                          },
                          { replace: true }
                        );
                      }
                    }}
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span className="-ml-4 grow">Edit Pin</span>
                  </button>
                  <button
                    type="button"
                    className="mt-2 w-full flex items-center text-xs text-red-700 font-medium py-1 px-2 bg-white/80 rounded-md hover:bg-white/90 md:py-2"
                    onClick={() => setOpenWarnModal(true)}
                  >
                    <TrashIcon className="w-5 h-5" />
                    <span className="-ml-4 grow">Remove Pin</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </Transition.Child>
      </Transition.Root>
    </>
  );
};
