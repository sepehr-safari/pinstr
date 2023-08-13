import { Kind, nip19 } from 'nostr-tools';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { MenuItem } from '@/components/Menus/MenuTemplate.types';

export default function useCreateBoard({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const publish = usePublish();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [coverPhotoURL, setCoverPhotoURL] = useState('');
  const [category, setCategory] = useState<MenuItem | null>(null);
  const [kind, setKind] = useState<MenuItem | null>(null);
  const [template, setTemplate] = useState<MenuItem | null>(null);

  const createBoard = useCallback(() => {
    if (
      !kind?.value ||
      !category?.name ||
      !template?.name ||
      !nameRef.current ||
      !nameRef.current.value ||
      !descriptionRef.current ||
      !descriptionRef.current.value
    ) {
      return;
    }

    publish({
      kind: +kind.value as Kind,
      tags: [
        ['d', nameRef.current.value],
        ['description', descriptionRef.current.value],
        ['category', category.name],
        ['template', template.name],
        ['cover', coverPhotoURL],
        ['headers', 'Content', 'Label'],
      ],
    }).then((event) => {
      onSuccess();
      setCoverPhotoURL('');
      navigate(
        '/p/' + nip19.npubEncode(event.pubkey) + '/' + nameRef.current?.value
      );
    });
  }, [publish, navigate, coverPhotoURL, category, kind, template]);

  return {
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
    kind: {
      get: kind,
      set: setKind,
    },
    template: {
      get: template,
      set: setTemplate,
    },
    createBoard,
  };
}
