import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useCommentsParams, useCreatePinParams, useEditBoardParams } from '@/logic/hooks';
import { useBoards, useUser } from '@/logic/queries';

export const useBoardSummary = () => {
  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { commentsParam } = useCommentsParams();

  const { boards, status } = useBoards({ author: hex, title, enabled: !!hex && !!title });
  const board = boards ? boards[0] : undefined;

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == hex : false;

  const { setEditBoardParams } = useEditBoardParams(board);
  const { setCreatePinParams } = useCreatePinParams(board);

  return {
    status,
    board,
    setEditBoardParams,
    setCreatePinParams,
    selfBoard,
    like: async () => await board?.event.react('+'),
    commentsParam,
  };
};
