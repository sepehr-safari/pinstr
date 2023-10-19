import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';
import { useLocalStore } from '../store';

export const useNote = (noteId: string | undefined) => {
  const [note, setNote] = useState<NDKEvent | undefined | null>(undefined);

  const ndk = useLocalStore((state) => state.ndk);

  useEffect(() => {
    if (!noteId || !!note || !ndk) return;

    ndk.fetchEvent(noteId).then((event) => setNote(event));
  }, [noteId, note, ndk, setNote]);

  return { note };
};
