import { getKindFromLocalStorage } from '@/utils';

const NoBoards = () => {
  const kind = getKindFromLocalStorage();

  return (
    <div className="text-center">
      <p>No boards found!</p>

      <br />

      {kind !== -1 && <p>Hint: Try different kinds of events.</p>}
    </div>
  );
};

export default NoBoards;
