import { useParams } from 'next/navigation';

const useCurrentParams = () => {
  const params = useParams();
  const boardName = params?.board
    ? decodeURIComponent(params.board)
    : undefined;
  const pinName = params?.pin ? decodeURIComponent(params.pin) : undefined;

  return {
    boardName,
    pinName,
  };
};

export default useCurrentParams;
