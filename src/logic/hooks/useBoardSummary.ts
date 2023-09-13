import { nip19 } from 'nostr-tools';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useCreatePinParams, useEditBoardParams } from '@/logic/hooks';
import { useMutateBoardLike } from '@/logic/mutations';
import { useBoardReactions, useBoards, useUser } from '@/logic/queries';

export const useBoardSummary = () => {
  const { npub } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : undefined;

  const { data, status } = useBoards();
  const board = data ? data.pages?.[0]?.[0] : undefined;

  const { data: reactions } = useBoardReactions(board);
  const { mutate: like } = useMutateBoardLike(board);

  const { pubkey } = useUser();
  const selfBoard = pubkey ? pubkey == hex : false;

  const likedByUser = useMemo(
    () => !!reactions?.likes.find((event) => event.pubkey == pubkey),
    [reactions?.likes, pubkey]
  );
  const zapedByUser = useMemo(
    () => !!reactions?.zaps.find((event) => event.pubkey == pubkey),
    [reactions?.zaps, pubkey]
  );

  const { setEditBoardParams } = useEditBoardParams(board);
  const { setCreatePinParams } = useCreatePinParams(board);

  return {
    status,
    board,
    reactions,
    setEditBoardParams,
    setCreatePinParams,
    selfBoard,
    like,
    likedByUser,
    zapedByUser,
  };
};
