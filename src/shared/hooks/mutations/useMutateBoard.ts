import { useNewEvent } from 'nostr-hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/shared/components/ui/use-toast';
import { Board, Format } from '@/shared/types';
import { normalizePinContent } from '@/shared/utils';

type PublishBoardParams = {
  board: Partial<Board>;
  overridePins?: string[][] | undefined;
};

const publishBoardFn = async ({ board, overridePins }: PublishBoardParams) => {
  const { createNewEvent } = useNewEvent();

  if (
    !board.format ||
    !board.category ||
    !board.title ||
    !board.description ||
    !board.image ||
    !board.headers
  ) {
    throw new Error('Missing required fields');
  }

  const newPins = [...(overridePins || board.pins || [])];
  for (let pinIndex = 0; pinIndex < newPins.length; pinIndex++) {
    for (let hIndex = 0; hIndex < board.headers.length; hIndex++) {
      if (newPins[pinIndex][hIndex] !== '') {
        const normalizedContent = await normalizePinContent({
          content: newPins[pinIndex][hIndex],
          format: board.headers[hIndex].split(':')[0] as Format,
        });

        newPins[pinIndex][hIndex] = normalizedContent;
      }
    }
  }

  const e = createNewEvent();
  e.content = '';
  e.kind = 33889;
  e.tags = [
    ['d', board.title],
    ['description', board.description],
    ['c', board.category],
    ['f', board.format],
    ['image', board.image],
    ['headers', ...board.headers],
    ...(board.tags || [])
      .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
      .map((t) => ['t', t]),
    ...newPins.filter((p) => p.some((c) => c !== '')).map((p) => ['pin', ...p]),
  ];

  try {
    await e.publish();

    return e;
  } catch (_) {
    throw new Error('Error in publishing');
  }
};

const deleteBoardFn = async ({ board }: { board: Partial<Board> }) => {
  if (!board.event || !board.event.id) {
    throw new Error('Missing required fields');
  }

  try {
    await board.event.delete(undefined, true);

    return board.event;
  } catch (_) {
    throw new Error('Error in deleting');
  }
};

export const useMutateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  return {
    isLoading,
    publishBoard: (board: Partial<Board>, onSuccess?: () => void) => {
      setIsLoading(true);

      toast({ description: 'Publishing...' });

      publishBoardFn({ board })
        .then((event) => {
          toast({ description: 'Successfully published!', variant: 'success' });

          navigate(`/p/${event.author.npub}/${encodeURIComponent(board.title || '')}`, {
            replace: true,
          });

          onSuccess?.();
        })
        .catch(() => {
          toast({
            description: 'An error has been occured! Please try again.',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    deleteBoard: (board: Partial<Board>, onSuccess?: () => void) => {
      setIsLoading(true);

      toast({ description: 'Deleting board...' });

      deleteBoardFn({ board })
        .then((event) => {
          toast({ description: 'Successfully deleted!', variant: 'success' });

          navigate('/p/' + event.author.npub, {
            replace: true,
          });

          onSuccess?.();
        })
        .catch(() => {
          toast({
            description: 'An error has been occured! Please try again.',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    removePin: (board: Partial<Board>, pinIndex: number, onSuccess?: () => void) => {
      const newPins = [...(board.pins || [])];

      if (newPins.length > 0) {
        newPins.splice(pinIndex, 1);

        setIsLoading(true);

        toast({ description: 'Removing pin...' });

        publishBoardFn({ board, overridePins: newPins })
          .then(() => {
            toast({ description: 'Successfully removed!', variant: 'success' });

            navigate(`/p/${board.event!.author.npub}/${encodeURIComponent(board.title || '')}`, {
              replace: true,
            });

            onSuccess?.();
          })
          .catch(() => {
            toast({
              description: 'An error has been occured! Please try again.',
              variant: 'destructive',
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        throw new Error('Unexpected remove action');
      }
    },
  };
};
