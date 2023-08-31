export const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto relative max-w-screen-4xl gap-y-6 gap-x-8 flex flex-col xl:flex-row xl:p-8">
    {children}
  </div>
);
