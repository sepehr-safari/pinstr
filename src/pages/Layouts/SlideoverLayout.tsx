import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const SlideoverLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document
      .getElementById('bottom-slideover')
      ?.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="fixed inset-0 bg-black bg-opacity-70 duration-200" />
        </Transition.Child>

        <div
          className="overflow-y-auto fixed inset-x-0 bottom-0 w-full h-full focus:outline-none"
          tabIndex={0}
          id="bottom-slideover"
        >
          <div className="pointer-events-none w-full h-full flex px-0 pt-28 md:px-10 lg:px-20">
            <Transition.Child
              as={Fragment}
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="pointer-events-auto w-full duration-500">
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
