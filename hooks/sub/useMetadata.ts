import { useSubscribe } from 'nostr-hooks';
import { nip19 } from 'nostr-tools';

type Params = {
  pubkey: string;
};

const useMetadata = ({ pubkey }: Params) => {
  const { events, eose } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: [{ authors: [pubkey], kinds: [0] }],
    options: { enabled: !!pubkey },
  });

  const profile = events.length > 0 && JSON.parse(events[0]?.content || '{}');

  const author: Author = {
    about: profile.about || '',
    banner: profile.banner || '',
    id: profile.id || '',
    lud06: profile.lud06 || '',
    name: profile.name || '',
    nip05: profile.nip05 || '',
    picture: profile.picture || '',
    website: profile.website || '',
    displayName: profile.display_name || profile.name,
  };

  const npub = events.length > 0 ? nip19.npubEncode(events[0].pubkey) : '';

  return {
    ...author,
    npub,
    eose,
  };
};

export default useMetadata;
