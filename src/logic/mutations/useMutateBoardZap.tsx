import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Board } from '@/logic/types';

export const useMutateBoardZap = ({
  board,
  amount,
  comment,
}: {
  board: Board | undefined | null;
  amount: number;
  comment: string;
}) => {
  const queryClient = useQueryClient();

  const zapBoardFn = useCallback(async () => {
    if (!board) {
      throw new Error('Board is not defined');
    }

    try {
      const invoice = await board.event.zap(amount * 1000, comment);

      const { webln } = window as { webln?: any };

      await webln.enable();

      await webln.sendPayment(invoice);

      return true;
    } catch (e) {
      throw e;
    }
  }, [board, amount, comment]);

  return useMutation({
    mutationFn: () =>
      toast.promise(zapBoardFn, {
        pending: 'Zapping...',
        success: 'Successfully Zapped!',
        error: 'Failed to zap board',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'nostr',
          'boards',
          { author: board?.event.author.pubkey, title: board?.title },
          'reactions',
        ],
        exact: false,
      });
    },
  });
};
