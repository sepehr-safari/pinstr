import { nip19 } from 'nostr-tools';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { MenuItem } from '@/components/Menus/MenuTemplate.types';
import { BoardType } from '@/components';

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

  const [coverPhotoURL, setCoverPhotoURL] = useState('');
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

    const kind: number =
      selectedBoardType.id === 5
        ? 30000
        : selectedBoardType.id === 6
        ? 30001
        : 33889;

    const headers: string[] = ['headers', 'Content'];
    selectedBoardType.id < 5 && headers.push('Label');
    selectedBoardType.id < 3 && headers.push('Icon');

    publish({
      kind,
      tags: [
        ['d', nameRef.current.value],
        ['description', descriptionRef.current.value],
        ['category', category.name],
        ['type', `${selectedBoardType.id}`],
        ['cover', coverPhotoURL],
        [...headers],
      ],
    }).then((event) => {
      onSuccess();
      setCoverPhotoURL('');
      navigate(
        '/p/' + nip19.npubEncode(event.pubkey) + '/' + nameRef.current?.value
      );
    });
  }, [
    publish,
    navigate,
    coverPhotoURL,
    category,
    selectedBoardType,
    onSuccess,
  ]);

  return {
    selectedBoardType,
    setSelectedBoardType,
    nameRef,
    descriptionRef,
    coverPhotoURL: {
      get: coverPhotoURL,
      set: setCoverPhotoURL,
    },
    category: {
      get: category,
      set: setCategory,
    },
    createBoard,
  };
}
