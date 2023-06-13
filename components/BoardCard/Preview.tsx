import { useMetadata } from '@/hooks';
import { nip19 } from 'nostr-tools';

const Preview = ({ address }: { address: string }) => {
  if (!address) return <></>;

  // if (address.startsWith('npub1')) {
  //   const { displayName, picture } = useMetadata({
  //     pubkey: nip19.decode(address).data.toString(),
  //   });
  //   return <span>{displayName}</span>;
  // } else if (address.startsWith('note1')) {
  //   {
  //     return <>{address}</>;
  //   }
  // } else {
  return <>{address}</>;
  // }
};

export default Preview;
