import { useParams } from 'next/navigation';

const useCurrentParams = () => {
  const params = useParams();
  const boardName = params?.board
    ? decodeURIComponent(params.board)
    : undefined;
  const pinName = params?.pin ? decodeURIComponent(params.pin) : undefined;
  const npub = params?.npub || undefined;

  return {
    boardName,
    pinName,
    npub,
  };
};

export default useCurrentParams;
