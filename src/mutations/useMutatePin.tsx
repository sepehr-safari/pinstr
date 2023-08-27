import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectableBoardTypeItems } from '@/components';
import { categories } from '@/components/Menus';
import { usePublish } from '@/mutations';
import { Board, ParsedPin } from '@/types';
import { normalizePinContent } from '@/utils';

export const useMutatePin = ({
  initialBoard,
  initialPinIndex,
  onClose,
}: {
  initialBoard?: Board;
  initialPinIndex?: number;
  onClose?: () => void;
}) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const publish = usePublish();

  const initialCurrentPin: ParsedPin = {};
  initialBoard?.headers.forEach((header, index) => {
    initialCurrentPin[header] =
      typeof initialPinIndex != 'undefined' && initialPinIndex > -1
        ? initialBoard?.pins[initialPinIndex][index]
        : '';
  });

  const [currentPin, setCurrentPin] = useState(initialCurrentPin);

  const mutatePinFn = useCallback(
    (newPins: string[][]) => {
      const type = selectableBoardTypeItems.find(
        (item) => item.type == initialBoard?.type
      );
      const category = categories.find(
        (c) => c.title === initialBoard?.category
      );

      if (
        !type ||
        !category ||
        !initialBoard?.title ||
        !initialBoard?.description ||
        !initialBoard?.image
      ) {
        throw new Error('Missing required fields');
      }

      return publish({
        kind: 33889 as number,
        tags: [
          ['d', initialBoard?.title],
          ['description', initialBoard?.description],
          ['category', category.title],
          ['type', type.type],
          ['image', initialBoard?.image],
          initialBoard?.headers.length > 0
            ? ['headers', ...initialBoard?.headers]
            : ['headers', ...type.headers],
          ...initialBoard?.tags
            .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
            .map((t) => ['t', t]),
          ...newPins.map((p) => ['pin', ...p]),
        ],
      });
    },
    [publish, initialBoard, categories, selectableBoardTypeItems]
  );

  return {
    currentPin: {
      value: currentPin,
      set: setCurrentPin,
    },
    removePin: useMutation({
      mutationFn: () => {
        const newPins = initialBoard ? [...initialBoard.pins] : [];

        if (typeof initialPinIndex != 'undefined' && initialPinIndex != -1) {
          newPins.splice(initialPinIndex, 1);

          return mutatePinFn(newPins);
        } else {
          throw new Error('Unexpected remove action');
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'nostr',
            'boards',
            initialBoard?.author,
            initialBoard?.title,
          ],
        });

        onClose?.();
        setCurrentPin(initialCurrentPin);
        navigate(
          '/p/' +
            nip19.npubEncode(initialBoard!.author) +
            '/' +
            initialBoard?.title
        );
      },
    }),
    publishPin: useMutation({
      mutationFn: async () => {
        try {
          const newCurrentPin = [...Object.values(currentPin)];
          newCurrentPin[0] = await normalizePinContent({
            content: newCurrentPin[0],
            boardType: initialBoard!.type,
          });

          const newPins: string[][] =
            typeof initialPinIndex != 'undefined' && initialPinIndex != -1
              ? (initialBoard?.pins || []).map((p, i) =>
                  i != initialPinIndex ? p : newCurrentPin
                )
              : [...(initialBoard?.pins || []), newCurrentPin];

          return mutatePinFn(newPins);
        } catch (error) {
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            'nostr',
            'boards',
            initialBoard?.author,
            initialBoard?.title,
          ],
        });

        onClose?.();
        setCurrentPin(initialCurrentPin);
        navigate(
          '/p/' +
            nip19.npubEncode(initialBoard!.author) +
            '/' +
            initialBoard?.title
        );
      },
    }),
  };
};
