import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SelectableBoardTypeItem,
  selectableBoardTypeItems,
} from '@/components';
import { categories, MenuItem } from '@/components/Menus';
import { usePublish } from '@/mutations';
import { Board, ParsedPin } from '@/types';

export const useMutateBoard = ({
  setOpen,
  initialBoard,
  initialPinIndex,
}: {
  setOpen: (state: boolean) => void;
  initialBoard?: Board;
  initialPinIndex?: number;
}) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const publish = usePublish();

  const [id, setId] = useState<string>(initialBoard?.id || '');
  const [title, setTitle] = useState<string>(initialBoard?.title || '');
  const [description, setDescription] = useState<string>(
    initialBoard?.description || ''
  );
  const [image, setImage] = useState<string>(initialBoard?.image || '');
  const [category, setCategory] = useState<MenuItem | null>(
    initialBoard?.category
      ? categories.find((c) => c.title === initialBoard.category) || null
      : null
  );
  const [type, setType] = useState<SelectableBoardTypeItem | null>(
    initialBoard?.type
      ? selectableBoardTypeItems.find((b) => b.type == initialBoard.type) ||
          null
      : null
  );
  const [headers, setHeaders] = useState<string[]>(initialBoard?.headers || []);
  const [tags, setTags] = useState<string[]>(initialBoard?.tags || []);
  const [pins, setPins] = useState<string[][]>(initialBoard?.pins || []);

  const initialCurrentPin: ParsedPin = {};
  headers.forEach((header, index) => {
    initialCurrentPin[header] = initialPinIndex
      ? pins[initialPinIndex][index]
      : '';
  });

  const [currentPin, setCurrentPin] = useState(initialCurrentPin);

  const publishBoardFn = useCallback(() => {
    if (!type || !category || !title || !description || !image) {
      throw new Error('Missing required fields');
    }

    return publish({
      kind: 33889 as number,
      tags: [
        ['d', title],
        ['description', description],
        ['category', category.title],
        ['type', type.type],
        ['image', image],
        headers.length > 0
          ? ['headers', ...headers]
          : ['headers', ...type.headers],
        ...tags
          .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
          .map((t) => ['t', t]),
        ...pins.map((p) => ['pin', ...p]),
      ],
    });
  }, [publish, title, description, image, category, type, tags, pins, headers]);

  const deleteBoardFn = useCallback(() => {
    if (!initialBoard) {
      throw new Error('Missing initial board');
    }

    return publish({ kind: 5, tags: [['e', initialBoard.id]] });
  }, [initialBoard?.id, publish]);

  const updateBoardFn = useCallback(async () => {
    if (initialBoard && initialBoard.title != title) {
      await deleteBoardFn();
    }

    return publishBoardFn();
  }, [publishBoardFn, deleteBoardFn, title, initialBoard?.title]);

  return {
    id: {
      value: id,
      set: setId,
    },
    type: {
      value: type,
      set: setType,
    },
    title: {
      value: title,
      set: setTitle,
    },
    description: {
      value: description,
      set: setDescription,
    },
    image: {
      value: image,
      set: setImage,
    },
    category: {
      value: category,
      set: setCategory,
    },
    tags: {
      value: tags,
      set: setTags,
    },
    pins: {
      value: pins,
      set: setPins,
    },
    headers: {
      value: headers,
      set: setHeaders,
    },
    currentPin: {
      value: currentPin,
      set: setCurrentPin,
      sync: () => {
        if (!initialPinIndex) {
          setPins((pins) => [...pins, Object.values(currentPin)]);
        } else {
          const newPins = [...pins];
          newPins[initialPinIndex] = Object.values(currentPin);
          setPins(newPins);
        }
      },
    },
    publishBoard: useMutation({
      mutationFn: publishBoardFn,
      onSuccess: (event) => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setImage('');
        setCurrentPin(initialCurrentPin);
        setOpen(false);
        navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title);
      },
    }),
    updateBoard: useMutation({
      mutationFn: updateBoardFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setOpen(false);
      },
    }),
    deleteBoard: useMutation({
      mutationFn: deleteBoardFn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setImage('');
        setOpen(false);
        navigate('/p/' + nip19.npubEncode(initialBoard!.author), {
          replace: true,
        });
      },
    }),
  };
};
