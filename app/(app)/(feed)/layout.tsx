export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 pb-20">
      {children}
    </div>
  );
}
