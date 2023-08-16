import { nip19 } from 'nostr-tools';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { BoardType } from '@/components';
import { MenuItem } from '@/components/Menus/MenuTemplate.types';

export default function useCreateBoard({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const publish = usePublish();
  const navigate = useNavigate();

  const [selectedBoardType, setSelectedBoardType] = useState<BoardType | null>(
    null
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [coverImageURL, setCoverImageURL] = useState('');
  const [category, setCategory] = useState<MenuItem | null>(null);

  const createBoard = useCallback(() => {
    if (
      !selectedBoardType ||
      !category?.name ||
      !nameRef.current ||
      !nameRef.current.value ||
      !descriptionRef.current ||
      !descriptionRef.current.value
    ) {
      return;
    }

    publish({
      kind: selectedBoardType.kind,
      tags: [
        ['d', nameRef.current.value],
        ['description', descriptionRef.current.value],
        ['category', category.name],
        ['type', selectedBoardType.type],
        ['cover', coverImageURL],
        ['headers', ...selectedBoardType.headers],
      ],
    }).then((event) => {
      onSuccess();
      setCoverImageURL('');
      navigate(
        '/p/' + nip19.npubEncode(event.pubkey) + '/' + nameRef.current?.value
      );
    });
  }, [
    publish,
    navigate,
    coverImageURL,
    category,
    selectedBoardType,
    onSuccess,
  ]);

  return {
    selectedBoardType,
    setSelectedBoardType,
    nameRef,
    descriptionRef,
    coverImageURL: {
      get: coverImageURL,
      set: setCoverImageURL,
    },
    category: {
      get: category,
      set: setCategory,
    },
    createBoard,
  };
}
