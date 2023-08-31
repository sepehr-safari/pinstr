import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { useClickAway, useLongPress } from '@/logic/hooks';

export const PinContextMenu = ({
  onView,
  href,
  onClick,
}: {
  onView: () => void;
  href?: string;
  onClick?: () => void;
}) => {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

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
            <div className="w-3/4">
              <button
                type="button"
                className="w-full text-xs text-gray-900 font-medium py-1 bg-white/70 rounded-md hover:bg-white/90 md:py-2"
                onClick={onView}
              >
                View Details
              </button>

              {!!href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full inline-block text-center text-xs text-gray-900 font-medium py-1 bg-white/70 rounded-md hover:bg-white/90 md:py-2"
                >
                  Open
                </a>
              )}
            </div>
          </div>
        </Transition.Child>
      </Transition.Root>
    </>
  );
};
