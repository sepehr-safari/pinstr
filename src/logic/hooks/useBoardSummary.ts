import { nip19 } from 'nostr-tools';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useCommentsParams, useCreatePinParams, useEditBoardParams } from '@/logic/hooks';
import { useMutateBoardLike } from '@/logic/mutations';
import { useBoard, useBoardReactions, useUser } from '@/logic/queries';

export const useBoardSummary = () => {
  const { npub, title } = useParams();
  const hex = npub ? nip19.decode(npub).data.toString() : '';

  const { data: board } = useBoard({ author: hex, title: title! });

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
  const { toggleCommentsParams } = useCommentsParams();

  return {
    board,
    title,
    reactions,
    setEditBoardParams,
    setCreatePinParams,
    selfBoard,
    like,
    likedByUser,
    zapedByUser,
    toggleCommentsParams,
  };
};
