import { nip19 } from 'nostr-tools';
import { useNavigate, useParams } from 'react-router-dom';

import { useCommentsParams, useCreatePinParams } from '@/shared/hooks/common';
import { useBoard, useUser } from '@/shared/hooks/queries';

export const useBoardSummary = () => {
  const navigate = useNavigate();
  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { commentsParam } = useCommentsParams();

  const board = useBoard({ author, title });

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == author : false;

  const { setCreatePinParams } = useCreatePinParams(board ?? undefined);

  return {
    board,
    setCreatePinParams,
    selfBoard,
    like: async () => await board?.event.react('+'),
    commentsParam,
    navigate,
  };
};
