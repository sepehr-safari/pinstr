import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { categories } from '@/components/Menus/CategoryMenu';
import { MenuItem } from '@/components/Menus/MenuTemplate.types';
import {
  SelectableBoardTypeItem,
  selectableBoardTypeItems,
} from '@/components/SelectableBoardTypes';

export default function useMutateBoard({
  onSuccess,
  initialState = {},
}: {
  onSuccess: () => void;
  initialState?: {
    id?: string;
    title?: string;
    description?: string;
    coverImageURL?: string;
    category?: string;
    type?: string;
    tags?: string[];
    pins?: string[][];
  };
}) {
  const publish = usePublish();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>(initialState.title || '');
  const [description, setDescription] = useState<string>(
    initialState.description || ''
  );
  const [coverImageURL, setCoverImageURL] = useState<string>(
    initialState.coverImageURL || ''
  );
  const [category, setCategory] = useState<MenuItem | null>(
    initialState.category
      ? categories.find((c) => c.title === initialState.category) || null
      : null
  );
  const [selectedBoardType, setSelectedBoardType] =
    useState<SelectableBoardTypeItem | null>(
      initialState.type
        ? selectableBoardTypeItems.find((b) => b.type === initialState.type) ||
            null
        : null
    );
  const [tags, setTags] = useState<string[]>(initialState.tags || []);
  const [pins, setPins] = useState<string[][]>(initialState.pins || []);

  const publishBoard = useCallback(() => {
    if (!selectedBoardType || !category || !title || !description) {
      return;
    }

    publish({
      kind: 33889 as number,
      tags: [
        ['d', title],
        ['description', description],
        ['category', category.title],
        ['type', selectedBoardType.type],
        ['cover', coverImageURL],
        ['headers', ...selectedBoardType.headers],
        ...tags
          .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
          .map((t) => ['tag', t]),
        ...pins.map((p) => ['pin', ...p]),
      ],
    }).then((event) => {
      onSuccess();
      setCoverImageURL('');
      navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + title);
    });
  }, [
    publish,
    navigate,
    title,
    description,
    coverImageURL,
    category,
    selectedBoardType,
    onSuccess,
    tags,
    pins,
  ]);

  const deleteBoard = useCallback(() => {
    if (!initialState.id) {
      return;
    }

    publish({ kind: 5, tags: [['e', initialState.id]] });
  }, [initialState.id, publish]);

  const updateBoard = useCallback(() => {
    if (initialState.title != title) {
      deleteBoard();
    }

    publishBoard();
  }, [publishBoard, deleteBoard, title, initialState.title]);

  return {
    type: {
      value: selectedBoardType,
      set: setSelectedBoardType,
    },
    title: {
      value: title,
      set: setTitle,
    },
    description: {
      value: description,
      set: setDescription,
    },
    coverImageURL: {
      value: coverImageURL,
      set: setCoverImageURL,
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
    publishBoard,
    updateBoard,
    deleteBoard,
  };
}
