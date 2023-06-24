const LinkView = ({ link, view }: { link: string; view: string }) => {
  return (
    <>
      <span
        className="break-all text-primary cursor-pointer hover:opacity-90"
        onClick={() => window.open(link, '_blank', 'noopener noreferrer')}
      >
        {view}
      </span>
    </>
  );
};

export default LinkView;
