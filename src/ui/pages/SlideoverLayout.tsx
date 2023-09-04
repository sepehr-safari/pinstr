import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const SlideoverLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.getElementById('bottom-slideover')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Transition.Root show={true} appear={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(-1)}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 duration-300" />
        </Transition.Child>

        <div
          className="overflow-y-auto fixed inset-x-0 bottom-0 w-full h-full focus:outline-none"
          tabIndex={0}
          id="bottom-slideover"
        >
          <div className="pointer-events-none w-full h-full flex px-0 pt-40 md:px-10">
            <Transition.Child
              as={Fragment}
              enterFrom="translate-y-40 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-40 opacity-0"
            >
              <Dialog.Panel className="pointer-events-auto w-full duration-300">
                <div className="flex h-full w-full flex-col bg-white shadow-xl rounded-t-md">
                  <div className="min-h-full">
                    <Outlet />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
