export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-4 pb-20 flex flex-col items-center">{children}</div>;
}
