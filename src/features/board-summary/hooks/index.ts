import { nip19 } from 'nostr-tools';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useCommentsParams } from '@/shared/hooks/common';
import { useBoard, useUser } from '@/shared/hooks/queries';

export const useBoardSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { commentsParam } = useCommentsParams();

  const board = useBoard({ author, title });

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == author : false;

  return {
    board,
    selfBoard,
    like: async () => await board?.event.react('+'),
    commentsParam,
    navigate,
    state,
  };
};
