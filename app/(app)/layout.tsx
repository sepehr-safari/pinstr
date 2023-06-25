'use client';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  //
  return (
    <>
      <div className="flex flex-col">{children}</div>
    </>
  );
}
