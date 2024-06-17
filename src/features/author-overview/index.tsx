import { NDKUser } from '@nostr-dev-kit/ndk';
// import { Popover } from '@headlessui/react';
// import { PlusIcon, UserIcon } from '@heroicons/react/20/solid';
// import { useState } from 'react';
// import { usePopper } from 'react-popper';
// import { Link, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import { ellipsis, loader } from '@/shared/utils';

type Props = { author: NDKUser | undefined; boosted?: boolean };

// TODO: refactor
export const AuthorOverview = ({ author, boosted }: Props) => {
  if (author || boosted) {
  }

  return <></>;
};

// export const AuthorOverview = ({ author, boosted }: Props) => {
//   const location = useLocation();

//   const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
//   const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     placement: 'top',
//   });

//   if (!author || !author.profile || !author.npub) {
//     return <div className="animate-pulse w-1/2 mt-1 h-[0.8rem] rounded bg-gray-200" />;
//   }

//   const { profile, npub } = author;

//   return (
//     <Popover className="leading-none">
//       {({ open, close }) => (
//         <>
//           <Popover.Button
//             ref={setReferenceElement}
//             className="text-xs text-gray-500 focus:border-none focus:outline-none"
//             onMouseEnter={({ currentTarget }) => !open && currentTarget.click()}
//           >
//             {boosted && <span className="text-xs text-gray-500 mr-1">{`🚀 Boosted by`}</span>}
//             {ellipsis(profile.name || '', 30)}
//           </Popover.Button>

//           <Popover.Panel
//             onMouseLeave={close}
//             className="-mb-4 absolute left-1/2 z-10 flex w-screen max-w-min -translate-x-1/2 px-4"
//             ref={setPopperElement}
//             style={styles.popper}
//             {...attributes.popper}
//           >
//             <div className="mb-6 w-72 shrink rounded-md bg-white shadow-md ring-1 ring-gray-900/20">
//               <div className="text-center divide-y divide-gray-200">
//                 <div className="relative">
//                   <div className="absolute top-0 w-full p-1">
//                     <img
//                       className="w-full h-24 object-cover bg-gray-200 text-gray-200 rounded-t"
//                       src={loader(profile.banner || '', { w: 300, h: 96 })}
//                       alt={profile.name || '' + ' banner'}
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className="flex flex-1 flex-col pt-10 pb-4">
//                     <div className="mx-auto rounded-full bg-gray-300 text-gray-300 z-[1]">
//                       <img
//                         className="w-24 h-24 rounded-full"
//                         src={loader(profile.image || '', { w: 96, h: 96 })}
//                         alt={profile.name || '' + ' avatar'}
//                         loading="lazy"
//                       />
//                     </div>
//                     <h3 className="mt-4 text-sm font-semibold [overflow-wrap:anywhere]">
//                       {ellipsis(profile.name || '', 100)}
//                     </h3>
//                     <dl className="mt-1 flex flex-grow flex-col justify-between">
//                       <dt className="sr-only">Title</dt>
//                       <dd className="text-xs font-light text-gray-500 px-4 [overflow-wrap:anywhere]">
//                         {ellipsis(profile.about || '', 100)}
//                       </dd>
//                     </dl>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="-mt-px flex divide-x divide-gray-200">
//                     <div className="flex w-0 flex-1">
//                       <Link
//                         to={`/p/${npub}`}
//                         state={{ backgroundLocation: location }}
//                         className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-bl-lg border border-transparent py-2 text-xs font-semibold text-gray-900 hover:underline"
//                       >
//                         <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         Open Profile
//                       </Link>
//                     </div>
//                     <div className="-ml-px flex w-0 flex-1">
//                       <button
//                         onClick={() =>
//                           toast('This feature is still under development.', { type: 'warning' })
//                         }
//                         className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-br-lg border border-transparent py-2 text-xs font-semibold text-gray-900 hover:underline"
//                       >
//                         <PlusIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                         Follow
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Popover.Panel>
//         </>
//       )}
//     </Popover>
//   );
// };
