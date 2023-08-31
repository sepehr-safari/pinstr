import { nip05, nip19 } from 'nostr-tools';

import { typeOfProfileAddress } from '@/logic/utils';

export const normalizePinContent = async ({
  content,
  boardType,
}: {
  content: string;
  boardType: string;
}): Promise<string> => {
  switch (boardType) {
    case 'Text':
      return content;
    case 'Note':
      if (content.startsWith('note1')) {
        return nip19.decode(content).data.toString();
      } else {
        throw new Error('Invalid note id for content');
      }
    case 'Link':
    case 'Image':
    case 'Video':
      if (content.startsWith('http')) {
        return content;
      } else {
        throw new Error('Invalid URL for pin content of type ' + boardType);
      }
    case 'Profile':
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
      throw new Error('Invalid board type ' + boardType);
  }
};
