import { bech32 } from '@scure/base';

import { Author } from '@/logic/types';

export const getZapEndpoint = async (author: Author): Promise<string | undefined> => {
  let zapEndpoint: string | undefined;
  let zapEndpointCallback: string | undefined;

  if (author.lud16) {
    const [name, domain] = author.lud16.split('@');
    zapEndpoint = `https://${domain}/.well-known/lnurlp/${name}`;
  } else if (author.lud06) {
    const { words } = bech32.decode(author.lud06, 1000);
    const data = bech32.fromWords(words);
    const utf8Decoder = new TextDecoder('utf-8');
    zapEndpoint = utf8Decoder.decode(data);
  }

  if (!zapEndpoint) {
    throw new Error('No zap endpoint found');
  }

  const response = await fetch(zapEndpoint);
  const body = await response.json();

  if (body?.allowsNostr && (body?.nostrPubkey || body?.nostrPubKey)) {
    zapEndpointCallback = body.callback;
  }

  return zapEndpointCallback;
};
