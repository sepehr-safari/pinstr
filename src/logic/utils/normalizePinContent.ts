import { nip05, nip19 } from 'nostr-tools';

import { Format } from '@/logic/types';
import { typeOfProfileAddress } from '@/logic/utils';

export const normalizePinContent = async ({
  content,
  format,
}: {
  content: string;
  format: Format;
}): Promise<string> => {
  switch (format) {
    case Format.Text:
      return content;
    case Format.Note:
      if (content.startsWith('note1')) {
        return nip19.decode(content).data.toString();
      } else if (content.length == 64) {
        return content; // hex
      } else {
        throw new Error('Invalid note id for content');
      }
    case Format.Link:
    case Format.Image:
    case Format.Video:
      if (content.startsWith('http')) {
        return content;
      } else {
        throw new Error('Invalid URL for pin content of type ' + format);
      }
    case Format.Profile:
      switch (typeOfProfileAddress(content)) {
        case 'nip19':
          return nip19.decode(content).data.toString();
        case 'nip05':
          try {
            const profile = await nip05.queryProfile(content.replace('%40', '@'));

            if (profile == null || !profile.pubkey)
              throw new Error('Invalid profile address ' + content);

            return profile.pubkey;
          } catch (error) {
            throw new Error('Error querying profile address ' + content);
          }
        case 'hex':
          return content;
        default:
          throw new Error('Unknown profile scheme ' + content);
      }
    default:
      throw new Error('Invalid board type'); // never happens
  }
};
