const Badge = ({ label }: { label: string }) => {
  return (
    <>
      <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-300">
        {label}
      </span>
    </>
  );
};

export default Badge;
