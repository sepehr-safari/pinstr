interface LayoutProps {
  drawerId: string;
  main: React.ReactNode;
  drawer: React.ReactNode;
}

const Layout = ({ drawer, drawerId, main }: LayoutProps) => {
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center gap-2">
          {main}
        </div>
        <div className="drawer-side">
          <label htmlFor={drawerId} className="drawer-overlay"></label>
          <ul className="menu menu-compact w-80 bg-base-200 border-r-[1px] border-neutral-600">
            {drawer}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Layout;
