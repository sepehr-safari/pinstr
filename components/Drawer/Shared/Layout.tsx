type LayoutProps = {
  drawerId: 'pins-drawer' | 'boards-drawer';
  main: React.ReactNode;
  drawer: React.ReactNode;
};

const Layout = ({ drawer, drawerId, main }: LayoutProps) => {
  return (
    <>
      <div
        className={`h-full drawer ${
          drawerId === 'pins-drawer' ? 'xl:' : ''
        }drawer-mobile`}
      >
        <input id={drawerId} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center gap-2">
          {main}
        </div>
        <div className="drawer-side">
          <label htmlFor={drawerId} className="drawer-overlay"></label>
          {drawer}
        </div>
      </div>
    </>
  );
};

export default Layout;
