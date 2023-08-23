import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/mutations';

import { categories, MenuItem } from '@/components/Menus';
import {
  SelectableBoardTypeItem,
  selectableBoardTypeItems,
} from '@/components';
import { Board } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutateBoard = ({
  setOpen,
  initialBoard,
}: {
  setOpen: (state: boolean) => void;
  initialBoard?: Board;
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
    publishBoard: useMutation({
      mutationFn: publishBoardFn,
      onSuccess: (event) => {
        queryClient.invalidateQueries({ queryKey: ['nostr', 'boards'] });

        setImage('');
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
        navigate('/p/' + initialBoard?.author);
      },
    }),
  };
};
