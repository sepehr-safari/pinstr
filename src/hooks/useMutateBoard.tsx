import { nip19 } from 'nostr-tools';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { BoardType, boardTypes } from '@/components';
import { categories } from '@/components/Menus/CategoryMenu';
import { MenuItem } from '@/components/Menus/MenuTemplate.types';

export default function useMutateBoard({
  onSuccess,
  initialState = {},
}: {
  onSuccess: () => void;
  initialState?: {
    id?: string;
    name?: string;
    description?: string;
    coverImageURL?: string;
    category?: string;
    boardType?: string;
    tags?: string[];
    pins?: string[][];
  };
}) {
  const publish = usePublish();
  const navigate = useNavigate();

  const [name, setName] = useState<string>(initialState.name || '');
  const [description, setDescription] = useState<string>(
    initialState.description || ''
  );
  const [coverImageURL, setCoverImageURL] = useState<string>(
    initialState.coverImageURL || ''
  );
  const [category, setCategory] = useState<MenuItem | null>(
    initialState.category
      ? categories.find((c) => c.name === initialState.category) || null
      : null
  );
  const [selectedBoardType, setSelectedBoardType] = useState<BoardType | null>(
    initialState.boardType
      ? boardTypes.find((b) => b.type === initialState.boardType) || null
      : null
  );
  const [tags, setTags] = useState<string[]>(initialState.tags || []);

  const createBoard = useCallback(() => {
    if (!selectedBoardType || !category || !name || !description) {
      return;
    }

    publish({
      kind: selectedBoardType.kind,
      tags: [
        ['d', name],
        ['description', description],
        ['category', category.name],
        ['type', selectedBoardType.type],
        ['cover', coverImageURL],
        ['headers', ...selectedBoardType.headers],
        ...tags
          .filter((t, i, a) => t.length > 0 && a.indexOf(t) === i)
          .map((t) => ['tag', t]),
        ...(initialState.pins || []).map((p) => ['pin', ...p]),
      ],
    }).then((event) => {
      onSuccess();
      setCoverImageURL('');
      navigate('/p/' + nip19.npubEncode(event.pubkey) + '/' + name);
    });
  }, [
    publish,
    navigate,
    name,
    description,
    coverImageURL,
    category,
    selectedBoardType,
    onSuccess,
    tags,
    initialState.pins,
  ]);

  const deleteBoard = useCallback(() => {
    if (!initialState.id) {
      return;
    }

    publish({ kind: 5, tags: [['e', initialState.id]] });
  }, [initialState.id, publish]);

  const updateBoard = useCallback(() => {
    if (initialState.name == name) {
      deleteBoard();
    }

    createBoard();
  }, [createBoard, deleteBoard, name, initialState.name]);

  return {
    boardType: {
      value: selectedBoardType,
      set: setSelectedBoardType,
    },
    name: {
      value: name,
      set: setName,
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
    createBoard,
    updateBoard,
  };
}
