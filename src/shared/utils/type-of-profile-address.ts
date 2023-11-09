import { ProfileAddressType } from '@/shared/types';

export const typeOfProfileAddress = (address: string): ProfileAddressType => {
  if (address.startsWith('npub1')) {
    return 'nip19';
  } else if (address.includes('%40') || address.includes('@')) {
    return 'nip05';
  } else if (address.length == 64) {
    return 'hex';
  } else {
    return 'unknown';
  }
};
