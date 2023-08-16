import { Kind, nip19 } from 'nostr-tools';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePublish } from '@/hooks';

import { MenuItem } from '@/components/Menus/MenuTemplate.types';

export default function useAddPin({ onSuccess }: { onSuccess: () => void }) {
  // TODO

  const publish = usePublish();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [coverImageURL, setCoverImageURL] = useState('');
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
        ['cover', coverImageURL],
        ['headers', 'Content', 'Label'],
      ],
    }).then((event) => {
      onSuccess();
      setCoverImageURL('');
      navigate(
        '/p/' + nip19.npubEncode(event.pubkey) + '/' + nameRef.current?.value
      );
    });
  }, [publish, navigate, coverImageURL, category, kind, template]);

  return {
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
