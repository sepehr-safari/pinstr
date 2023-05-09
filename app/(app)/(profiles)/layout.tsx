export default function ProfilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4">
      {children}
    </div>
  );
}
