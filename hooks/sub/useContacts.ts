import { useSubscribe } from 'nostr-hooks';

type Params = {
  pubkey: string | undefined;
};

const useContacts = ({ pubkey }: Params) => {
  const { events, eose } = useSubscribe({
    relays: ['wss://nos.lol'],
    filters: pubkey ? [{ authors: [pubkey], kinds: [3] }] : [],
    options: { enabled: !!pubkey },
  });

  return {
    events,
    eose,
  };
};

export default useContacts;
