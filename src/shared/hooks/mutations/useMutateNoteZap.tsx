import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useMutateNoteZap = ({
  note,
  amount,
  comment,
}: {
  note: NDKEvent | undefined | null;
  amount: number;
  comment: string;
}) => {
  const queryClient = useQueryClient();

  const zapNoteFn = useCallback(async () => {
    if (!note) {
      throw new Error('Note is not defined');
    }
    const invoice = await note.zap(amount * 1000, comment);

    const { webln } = window as { webln?: any };

    if (webln) {
      try {
        await webln.enable();

        try {
          await webln.sendPayment(invoice);

          return true;
        } catch (error) {
          throw new Error('Failed to send payment');
        }
      } catch (e) {
        throw new Error('Failed to enable WebLN');
      }
    } else {
      throw new Error('WebLN is not defined');
    }
  }, [note, amount, comment]);

  return useMutation({
    mutationFn: () =>
      toast.promise(zapNoteFn, {
        pending: 'Zapping...',
        success: 'Successfully Zapped!',
        error: 'Failed to zap note',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['nostr', 'notes', note?.id, 'reactions']);
    },
  });
};
