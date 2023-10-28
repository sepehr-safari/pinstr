import {
  Event,
  EventTemplate,
  UnsignedEvent,
  getEventHash,
  getPublicKey,
  getSignature,
} from 'nostr-tools';

export const signEventWithNip07 = async (eventTemplate: EventTemplate) => {
  if (!(window as any).nostr) throw new Error('Nostr extension not found');

  const signedEvent: Event = (await (window as any).nostr.signEvent(eventTemplate)) || undefined;

  if (!signedEvent) throw new Error('Nostr extension failed to sign event');

  return signedEvent;
};

export const signEventWithSeckey = (eventTemplate: EventTemplate, seckey: string) => {
  const unsignedEvent: UnsignedEvent = {
    ...eventTemplate,
    pubkey: getPublicKey(seckey),
  };

  const signedEvent: Event = {
    ...unsignedEvent,
    id: getEventHash(unsignedEvent),
    sig: getSignature(unsignedEvent, seckey),
  };

  return signedEvent;
};
