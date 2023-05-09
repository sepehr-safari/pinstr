'use client';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //
  return (
    <>
      <div className="flex h-full flex-col">{children}</div>
    </>
  );
}
