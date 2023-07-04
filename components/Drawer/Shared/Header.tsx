type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => {
  return (
    <>
      <div className="flex justify-between items-center text-xs text-neutral-400 py-2 px-4">
        <span>My Boards</span>
        {children}
      </div>
    </>
  );
};

export default Header;
