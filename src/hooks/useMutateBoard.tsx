import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { categories, MenuItem } from '@/components/Menus';
import {
  SelectableBoardTypeItem,
  selectableBoardTypeItems,
} from '@/components';
import { Board } from '@/types';

export const useMutateBoard = ({
  onSuccess,
  initialBoard,
}: {
  onSuccess: () => void;
  initialBoard?: Board;
}) => {
  const publish = usePublish();
  const navigate = useNavigate();

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

  const publishBoard = useCallback(() => {
    if (!type || !category || !title || !description || !image) {
      return;
    }

    publish({
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
    }).then((event) => {
      onSuccess();
      setImage('');
      navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title);
    });
  }, [
    publish,
    navigate,
    title,
    description,
    image,
    category,
    type,
    onSuccess,
    tags,
    pins,
    headers,
  ]);

  const deleteBoard = useCallback(() => {
    if (!initialBoard) {
      return;
    }

    publish({ kind: 5, tags: [['e', initialBoard.id]] });
  }, [initialBoard?.id, publish]);

  const updateBoard = useCallback(() => {
    if (initialBoard && initialBoard.title != title) {
      deleteBoard();
    }

    publishBoard();
  }, [publishBoard, deleteBoard, title, initialBoard?.title]);

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
    publishBoard,
    updateBoard,
    deleteBoard,
  };
};
