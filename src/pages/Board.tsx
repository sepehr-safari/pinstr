import { useParams } from 'react-router-dom';

export default function Board() {
  const params = useParams();
  const boardName = params.boardName;

  return (
    <>
      <div>{boardName}</div>
    </>
  );
}
