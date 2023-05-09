'use client';

import { Navbar } from '@/components';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //
  return (
    <>
      <div className="flex h-full flex-col">
        <Navbar />

        {children}
      </div>
    </>
  );
}
