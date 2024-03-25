import { useActiveUser } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';
import { useNavigate, useParams } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';
import { useCommentsParams } from '@/shared/hooks/common';
import { useBoard } from '@/shared/hooks/queries';

export const useBoardSummary = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const { npub, title } = useParams();
  const author = npub ? nip19.decode(npub).data.toString() : undefined;

  const { commentsParam } = useCommentsParams();

  const board = useBoard({ author, title });

  const { activeUser } = useActiveUser();
  const selfBoard = activeUser && activeUser.pubkey ? activeUser.pubkey == author : false;

  return {
    board,
    selfBoard,
    like: async () => await board?.event.react('+'),
    commentsParam,
    navigate,
    toast,
  };
};
