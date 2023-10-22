import { nip19 } from 'nostr-tools';
import { useParams } from 'react-router-dom';

import { useCommentsParams, useCreatePinParams, useEditBoardParams } from '@/logic/hooks';
import { useBoard, useUser } from '@/logic/queries';

export const useBoardSummary = () => {
  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { commentsParam } = useCommentsParams();

  const board = useBoard({ author, title });

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == author : false;

  const { setEditBoardParams } = useEditBoardParams(board ?? undefined);
  const { setCreatePinParams } = useCreatePinParams(board ?? undefined);

  return {
    board,
    setEditBoardParams,
    setCreatePinParams,
    selfBoard,
    like: async () => await board?.event.react('+'),
    commentsParam,
  };
};
