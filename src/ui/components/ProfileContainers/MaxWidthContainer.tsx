export const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto relative max-w-screen-4xl gap-6 flex flex-col xl:flex-row xl:p-6">
    {children}
  </div>
);
